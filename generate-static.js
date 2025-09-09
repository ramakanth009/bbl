const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Ultra-fast configuration
const CONFIG = {
  API_BASE: 'https://space.gigaspace.org',
  SITE_BASE: 'https://gigalabs.in',
  BATCH_SIZE: 100, // Concurrent batch size
  SECTION: 'discover',
  CACHE_TTL: 1000 * 60 * 10, // 10 minutes cache
  TARGET_COUNT: null, // Auto-detected
  DEFAULT_IMAGE: 'https://gigalabs.in/android-chrome-512x512.png',
  DEFAULT_DESCRIPTION: 'Experience conversations with AI characters on GigaSpace - the ultimate platform for interactive AI chat experiences.',
  CREATE_CATEGORY_PAGES: true,
  MAX_CONCURRENT: 50, // Maximum concurrent operations
  CHUNK_SIZE: 200, // Characters per chunk
};

// Promisified functions
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

// Global state
const cache = new Map();
const results = {
  processed: 0,
  successful: 0,
  missing: 0,
  errors: 0,
  totalPages: 0,
  startTime: Date.now(),
  categories: new Set()
};

// Live progress display
let progressInterval;
function startProgressDisplay() {
  progressInterval = setInterval(() => {
    const elapsed = (Date.now() - results.startTime) / 1000;
    const speed = results.processed / elapsed;
    const remaining = CONFIG.TARGET_COUNT - results.processed;
    const eta = remaining / speed;
    
    process.stdout.write('\r\x1b[K');
    process.stdout.write(
      `⚡ ${results.processed}/${CONFIG.TARGET_COUNT} ` +
      `(${(results.processed / CONFIG.TARGET_COUNT * 100).toFixed(1)}%) | ` +
      `${speed.toFixed(1)} chars/sec | ` +
      `${results.totalPages} pages | ` +
      `ETA: ${eta > 0 ? Math.ceil(eta / 60) : 0}m`
    );
  }, 500);
}

function stopProgressDisplay() {
  if (progressInterval) {
    clearInterval(progressInterval);
    process.stdout.write('\r\x1b[K');
  }
}

// Ultra-fast HTTP client
async function fetchCharacter(id) {
  const cacheKey = `char_${id}`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CONFIG.CACHE_TTL) {
      return data;
    }
  }
  
  const url = `${CONFIG.API_BASE}/getcharacter/${id}`;
  
  try {
    let data;
    
    if (typeof fetch !== 'undefined') {
      // Use built-in fetch (Node.js 18+)
      const response = await fetch(url, { 
        timeout: 3000,
        headers: {
          'User-Agent': 'GigaSpace-Turbo/3.0',
          'Connection': 'keep-alive'
        }
      });
      
      if (response.status === 404) {
        data = { notFound: true };
      } else if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      } else {
        data = await response.json();
      }
    } else {
      // Fallback to https module
      const https = require('https');
      const urlParts = new URL(url);
      
      data = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: urlParts.hostname,
          path: urlParts.pathname,
          method: 'GET',
          timeout: 3000,
          headers: {
            'User-Agent': 'GigaSpace-Turbo/3.0',
            'Connection': 'keep-alive'
          }
        }, (res) => {
          if (res.statusCode === 404) {
            resolve({ notFound: true });
            return;
          }
          
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }
          
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              reject(e);
            }
          });
        });
        
        req.on('error', reject);
        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Timeout'));
        });
        
        req.end();
      });
    }
    
    // Cache the result
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
    
  } catch (error) {
    // Return error data instead of throwing
    return { error: error.message };
  }
}

// Create slug from name
function createSlug(text) {
  if (!text) return 'character';
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Sanitize text for HTML
function sanitize(text) {
  if (!text) return '';
  return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Create default character
function createDefault(id) {
  return {
    id,
    name: `Character ${id}`,
    description: CONFIG.DEFAULT_DESCRIPTION,
    img: CONFIG.DEFAULT_IMAGE,
    tags: `Chat with Character ${id} on GigaSpace`,
    category: 'default',
    isDefault: true
  };
}

// Generate HTML for character
function generateHTML(character, baseHTML, pageType, url) {
  const title = sanitize(character.name);
  const description = sanitize(character.tags || character.description || CONFIG.DEFAULT_DESCRIPTION);
  const image = character.img || CONFIG.DEFAULT_IMAGE;
  
  let html = baseHTML.replace(/<title>[^<]*<\/title>/, `<title>Chat with ${title} | GigaSpace</title>`);
  
  const metaTags = `
    <meta name="description" content="${description.substring(0, 160)}">
    <meta property="og:title" content="Chat with ${title}">
    <meta property="og:description" content="${description.substring(0, 160)}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Chat with ${title}">
    <meta name="twitter:description" content="${description.substring(0, 160)}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:site" content="@gigaspace">`;
  
  return html.replace('</head>', `${metaTags}</head>`);
}

// Process single character with all pages
async function processCharacter(id, baseHTML) {
  const characterData = await fetchCharacter(id);
  
  let character;
  let isDefault = false;
  
  if (characterData.notFound || characterData.error) {
    character = createDefault(id);
    isDefault = true;
    results.missing++;
  } else {
    character = characterData;
    results.successful++;
    if (character.category) {
      results.categories.add(character.category);
    }
  }
  
  const slug = createSlug(character.name);
  const category = character.category || 'default';
  
  // Define pages to create
  const pages = [
    {
      path: `./build/dashboard/${CONFIG.SECTION}/chat/${id}/index.html`,
      url: `${CONFIG.SITE_BASE}/dashboard/${CONFIG.SECTION}/chat/${id}`
    }
  ];
  
  if (CONFIG.CREATE_CATEGORY_PAGES) {
    pages.push({
      path: `./build/dashboard/categories/${category}/chat/${id}/${slug}/index.html`,
      url: `${CONFIG.SITE_BASE}/dashboard/categories/${category}/chat/${id}/${slug}`
    });
  }
  
  // Create all pages concurrently
  const pagePromises = pages.map(async (page) => {
    try {
      // Ensure directory exists
      const dir = path.dirname(page.path);
      await mkdir(dir, { recursive: true });
      
      // Generate and write HTML
      const html = generateHTML(character, baseHTML, 'page', page.url);
      await writeFile(page.path, html);
      
      results.totalPages++;
      return { success: true, path: page.path };
    } catch (error) {
      return { success: false, error: error.message, path: page.path };
    }
  });
  
  await Promise.all(pagePromises);
  results.processed++;
}

// Semaphore for concurrency control
class Semaphore {
  constructor(max) {
    this.max = max;
    this.current = 0;
    this.queue = [];
  }
  
  async acquire() {
    return new Promise((resolve) => {
      if (this.current < this.max) {
        this.current++;
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  }
  
  release() {
    this.current--;
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      this.current++;
      next();
    }
  }
}

// Process chunk of characters with concurrency control
async function processChunk(characterIds, baseHTML, semaphore) {
  const promises = characterIds.map(async (id) => {
    await semaphore.acquire();
    try {
      await processCharacter(id, baseHTML);
    } finally {
      semaphore.release();
    }
  });
  
  await Promise.all(promises);
}

// Auto-detect target count
async function detectTargetCount() {
  console.log('🔍 Auto-detecting target count...');
  
  try {
    const firstChar = await fetchCharacter(1);
    if (firstChar.total_character_count) {
      console.log(`✅ Detected ${firstChar.total_character_count} characters`);
      return firstChar.total_character_count;
    }
  } catch (error) {
    console.warn('⚠️  Could not detect target count, using 1500');
  }
  
  return 1500;
}

// Cleanup old files
async function cleanup() {
  console.log('🧹 Cleaning up old files...');
  
  const pathsToClean = [
    './build/dashboard/discover/chat',
    './build/dashboard/categories',
    './build/generation-summary.json'
  ];
  
  for (const cleanPath of pathsToClean) {
    if (fs.existsSync(cleanPath)) {
      try {
        if (fs.rmSync) {
          fs.rmSync(cleanPath, { recursive: true, force: true });
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }
  
  console.log('✅ Cleanup complete');
}

// Main generation function
async function generateStatic() {
  console.log('🚀 TURBO STATIC GENERATOR STARTING...');
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  
  // Step 1: Cleanup
  await cleanup();
  
  // Step 2: Detect target count
  CONFIG.TARGET_COUNT = await detectTargetCount();
  
  // Step 3: Load base HTML
  console.log('📄 Loading base HTML template...');
  let baseHTML;
  try {
    baseHTML = await readFile('./build/index.html', 'utf8');
  } catch (error) {
    throw new Error('Could not read ./build/index.html - run build first');
  }
  
  console.log(`\n📊 TURBO CONFIGURATION:`);
  console.log(`   Target: ${CONFIG.TARGET_COUNT} characters`);
  console.log(`   Concurrency: ${CONFIG.MAX_CONCURRENT}`);
  console.log(`   Chunk Size: ${CONFIG.CHUNK_SIZE}`);
  console.log(`   Expected Pages: ~${CONFIG.CREATE_CATEGORY_PAGES ? CONFIG.TARGET_COUNT * 2 : CONFIG.TARGET_COUNT}`);
  console.log('=' .repeat(60));
  
  // Step 4: Start progress display
  console.log('⚡ Starting turbo-fast generation...\n');
  startProgressDisplay();
  
  // Step 5: Process in chunks with high concurrency
  const semaphore = new Semaphore(CONFIG.MAX_CONCURRENT);
  const characterIds = Array.from({ length: CONFIG.TARGET_COUNT }, (_, i) => i + 1);
  
  const chunkPromises = [];
  for (let i = 0; i < characterIds.length; i += CONFIG.CHUNK_SIZE) {
    const chunk = characterIds.slice(i, i + CONFIG.CHUNK_SIZE);
    chunkPromises.push(processChunk(chunk, baseHTML, semaphore));
  }
  
  // Wait for all chunks to complete
  await Promise.all(chunkPromises);
  
  // Step 6: Stop progress and show results
  stopProgressDisplay();
  
  const duration = (Date.now() - startTime) / 1000;
  const speed = CONFIG.TARGET_COUNT / duration;
  
  console.log(`\n🎉 TURBO GENERATION COMPLETE!`);
  console.log(`⚡ Time: ${(duration / 60).toFixed(2)} minutes`);
  console.log(`⚡ Speed: ${speed.toFixed(1)} characters/second`);
  console.log(`📄 Pages created: ${results.totalPages}`);
  console.log(`✅ Successful: ${results.successful}`);
  console.log(`📝 Missing (defaults): ${results.missing}`);
  console.log(`❌ Errors: ${results.errors}`);
  console.log(`📂 Categories found: ${results.categories.size}`);
  
  // Write summary
  const summary = {
    timestamp: new Date().toISOString(),
    duration: duration,
    speed: speed,
    stats: {
      total: CONFIG.TARGET_COUNT,
      successful: results.successful,
      missing: results.missing,
      errors: results.errors,
      pages: results.totalPages,
      categories: Array.from(results.categories)
    }
  };
  
  try {
    await writeFile('./build/generation-summary.json', JSON.stringify(summary, null, 2));
    console.log('📊 Summary written to generation-summary.json');
  } catch (error) {
    console.warn('⚠️  Could not write summary file');
  }
  
  console.log('\n🚀 READY FOR DEPLOYMENT!');
}

// Run if called directly
if (require.main === module) {
  generateStatic()
    .then(() => {
      process.exit(0);
    })
    .catch(error => {
      stopProgressDisplay();
      console.error('\n❌ GENERATION FAILED:', error.message);
      process.exit(1);
    });
}

module.exports = { generateStatic };
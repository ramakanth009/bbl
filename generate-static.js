const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Ultra-fast configuration
const CONFIG = {
  API_BASE: 'https://apex.gigaspace.org',
  SITE_BASE: 'https://gigaspace.org',
  BATCH_SIZE: 100, // Concurrent batch size
  SECTION: 'discover',
  CACHE_TTL: 1000 * 60 * 10, // 10 minutes cache
  TARGET_COUNT: null, // Auto-detected
  DEFAULT_IMAGE: 'https://gigaspace.org/android-chrome-192x192.png', // Smaller for WhatsApp
  DEFAULT_DESCRIPTION: 'Chat with AI characters on GigaSpace - Interactive AI conversations.',
  CREATE_CATEGORY_PAGES: true,
  MAX_CONCURRENT: 50, // Maximum concurrent operations
  CHUNK_SIZE: 200, // Characters per chunk
  // WhatsApp compatibility settings
  WHATSAPP_IMAGE_MAX_SIZE: 300 * 1024, // 300KB limit
  VALIDATE_IMAGES: true,
  MAX_DESCRIPTION_LENGTH: 155, // WhatsApp description limit
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
const imageValidationCache = new Map();
const results = {
  processed: 0,
  successful: 0,
  missing: 0,
  errors: 0,
  totalPages: 0,
  startTime: Date.now(),
  categories: new Set(),
  imageValidation: {
    valid: 0,
    invalid: 0,
    defaultUsed: 0
  }
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
      `ETA: ${eta > 0 ? Math.ceil(eta / 60) : 0}m | ` +
      `📷 ${results.imageValidation.valid}✅/${results.imageValidation.invalid}❌`
    );
  }, 500);
}

function stopProgressDisplay() {
  if (progressInterval) {
    clearInterval(progressInterval);
    process.stdout.write('\r\x1b[K');
  }
}

// WhatsApp-compatible image validation
async function validateImageForWhatsApp(imageUrl) {
  if (imageValidationCache.has(imageUrl)) {
    return imageValidationCache.get(imageUrl);
  }

  if (!imageUrl || !imageUrl.startsWith('http')) {
    const result = { valid: false, reason: 'Invalid URL' };
    imageValidationCache.set(imageUrl, result);
    return result;
  }

  try {
    let response;
    
    if (typeof fetch !== 'undefined') {
      response = await fetch(imageUrl, { 
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'WhatsApp-Image-Validator/1.0'
        }
      });
    } else {
      // Fallback to https module
      const https = require('https');
      const urlParts = new URL(imageUrl);
      
      response = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: urlParts.hostname,
          path: urlParts.pathname + urlParts.search,
          method: 'HEAD',
          timeout: 5000,
          headers: {
            'User-Agent': 'WhatsApp-Image-Validator/1.0'
          }
        }, (res) => {
          resolve({
            ok: res.statusCode === 200,
            status: res.statusCode,
            headers: {
              get: (name) => res.headers[name.toLowerCase()]
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

    if (!response.ok) {
      const result = { valid: false, reason: `HTTP ${response.status}` };
      imageValidationCache.set(imageUrl, result);
      return result;
    }

    const contentType = response.headers.get('content-type');
    const contentLength = parseInt(response.headers.get('content-length') || '0');

    // Check content type
    const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!contentType || !supportedTypes.some(type => contentType.includes(type))) {
      const result = { valid: false, reason: `Unsupported format: ${contentType}` };
      imageValidationCache.set(imageUrl, result);
      return result;
    }

    // Check file size for WhatsApp compatibility
    if (contentLength > CONFIG.WHATSAPP_IMAGE_MAX_SIZE) {
      const result = { 
        valid: false, 
        reason: `File too large: ${contentLength} bytes (max: ${CONFIG.WHATSAPP_IMAGE_MAX_SIZE})` 
      };
      imageValidationCache.set(imageUrl, result);
      return result;
    }

    const result = { 
      valid: true, 
      contentType, 
      fileSize: contentLength,
      url: imageUrl 
    };
    imageValidationCache.set(imageUrl, result);
    return result;

  } catch (error) {
    const result = { valid: false, reason: `Validation error: ${error.message}` };
    imageValidationCache.set(imageUrl, result);
    return result;
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

// Create slug from name - FIXED TO MATCH REACT APP
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

// FIXED: Generate WhatsApp iOS compatible HTML
function generateHTML(character, baseHTML, pageType, url) {
  const title = sanitize(character.name);
  let description = sanitize(character.tags || character.description || CONFIG.DEFAULT_DESCRIPTION);
  
  // Ensure description is under WhatsApp limit
  if (description.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
    description = description.substring(0, CONFIG.MAX_DESCRIPTION_LENGTH - 3) + '...';
  }
  
  const image = character.img || CONFIG.DEFAULT_IMAGE;
  
  // CRITICAL: Create WhatsApp-compatible HTML structure
  // Meta tags MUST come before ANY CSS or JavaScript
  const whatsAppCompatibleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- CRITICAL: Meta tags first for WhatsApp iOS compatibility -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, interactive-widget=resizes-content">
    
    <!-- Primary Meta Tags -->
    <title>Chat with ${title} | GigaSpace</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="AI chat, ${title}, character chat, GigaSpace, interactive AI">
    <meta name="author" content="GigaSpace">
    <meta name="robots" content="index, follow">
    
    <!-- WhatsApp iOS Critical OpenGraph Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="GigaSpace">
    <meta property="og:title" content="Chat with ${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:url" content="${url}">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@gigaspace">
    <meta name="twitter:title" content="Chat with ${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <meta name="twitter:image:alt" content="Chat with ${title} on GigaSpace">
    
    <!-- Additional Meta Tags for WhatsApp -->
    <meta property="article:author" content="GigaSpace">
    <meta name="theme-color" content="#6366f1">
    <meta name="google-site-verification" content="RqH2QNaf1zW_O61GbT9drBRt7wYSIKeBElGX3tsirns">
    
    <!-- Schema.org structured data for enhanced WhatsApp compatibility -->
    <link itemprop="thumbnailUrl" href="${image}">
    <span itemprop="thumbnail" itemscope itemtype="http://schema.org/ImageObject">
        <link itemprop="url" href="${image}">
    </span>
    
    <!-- Favicons -->
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    
    <!-- Google Tag Manager - Minimal for WhatsApp compatibility -->
    <script>
    !function(e,t,a,n){e[n]=e[n]||[],e[n].push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var g=t.getElementsByTagName(a)[0],m=t.createElement(a);m.async=!0,m.src="https://www.googletagmanager.com/gtm.js?id=GTM-TGKQ9W5Q",g.parentNode.insertBefore(m,g)}(window,document,"script","dataLayer");
    </script>
    
    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- DEFERRED: Load CSS and fonts after WhatsApp crawler reads meta tags -->
    <script>
        // Function to load deferred resources
        function loadDeferredResources() {
            // Load Google Fonts
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
            
            // Load main CSS
            const cssLink = document.createElement('link');
            cssLink.href = '/static/css/main.a22fd9bf.css';
            cssLink.rel = 'stylesheet';
            document.head.appendChild(cssLink);
        }
        
        // Load resources after a brief delay to allow WhatsApp crawler to finish
        if (typeof navigator !== 'undefined' && navigator.userAgent.includes('WhatsApp')) {
            // WhatsApp crawler detected - load resources immediately after meta tags are read
            setTimeout(loadDeferredResources, 50);
        } else {
            // Regular user - load resources when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadDeferredResources);
            } else {
                loadDeferredResources();
            }
        }
    </script>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TGKQ9W5Q" 
                height="0" width="0" style="display:none;visibility:hidden">
        </iframe>
    </noscript>
    
    <!-- React App Container -->
    <div id="root">
        <!-- Fallback content with inline styles to avoid external CSS dependency -->
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: white;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
            text-align: center;
        ">
            <div style="
                background: rgba(255,255,255,0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 16px;
                padding: 32px;
                max-width: 400px;
                width: 100%;
            ">
                <h1 style="
                    margin: 0 0 16px 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #6366f1;
                ">Chat with ${title}</h1>
                <p style="
                    margin: 0 0 20px 0;
                    opacity: 0.8;
                    line-height: 1.5;
                ">${description}</p>
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 2px solid #6366f1;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                "></div>
            </div>
        </div>
    </div>
    
    <!-- CSS Animation for loading spinner -->
    <style>
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Ensure proper mobile viewport handling */
        @media (max-width: 768px) {
            #root > div {
                padding: 16px !important;
            }
        }
    </style>
    
    <!-- DEFERRED: Load main React app -->
    <script>
        // Load main React JavaScript after brief delay
        function loadMainApp() {
            const script = document.createElement('script');
            script.src = '/static/js/main.c99f7e2b.js';
            script.defer = true;
            script.onload = function() {
                console.log('GigaSpace app loaded - Character: ${title}');
            };
            document.head.appendChild(script);
        }
        
        // Load after ensuring WhatsApp has time to crawl
        setTimeout(loadMainApp, 100);
    </script>
</body>
</html>`;

  return whatsAppCompatibleHTML;
}

// Enhanced character processing with WhatsApp image validation
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
  
  // Validate image for WhatsApp compatibility
  if (CONFIG.VALIDATE_IMAGES && character.img) {
    const imageValidation = await validateImageForWhatsApp(character.img);
    if (!imageValidation.valid) {
      console.warn(`⚠️  Character ${id} (${character.name}): ${imageValidation.reason} - Using default image`);
      character.img = CONFIG.DEFAULT_IMAGE;
      results.imageValidation.invalid++;
      results.imageValidation.defaultUsed++;
    } else {
      results.imageValidation.valid++;
    }
  } else if (!character.img) {
    character.img = CONFIG.DEFAULT_IMAGE;
    results.imageValidation.defaultUsed++;
  }
  
  // Ensure description is WhatsApp-friendly length
  if (character.description && character.description.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
    character.description = character.description.substring(0, CONFIG.MAX_DESCRIPTION_LENGTH - 3) + '...';
  }
  
  if (character.tags && character.tags.length > CONFIG.MAX_DESCRIPTION_LENGTH) {
    character.tags = character.tags.substring(0, CONFIG.MAX_DESCRIPTION_LENGTH - 3) + '...';
  }
  
  const slug = createSlug(character.name);
  const category = character.category || 'default';
  
  // Define pages to create
  const pages = [
    {
      path: `./build/dashboard/${CONFIG.SECTION}/${id}/${slug}/index.html`,
      url: `${CONFIG.SITE_BASE}/dashboard/${CONFIG.SECTION}/${id}/${slug}`
    }
  ];
  
  if (CONFIG.CREATE_CATEGORY_PAGES) {
    pages.push({
      path: `./build/dashboard/categories/${category}/${id}/${slug}/index.html`,
      url: `${CONFIG.SITE_BASE}/dashboard/categories/${category}/${id}/${slug}`
    });
  }
  
  // Create all pages concurrently
  const pagePromises = pages.map(async (page) => {
    try {
      // Ensure directory exists
      const dir = path.dirname(page.path);
      await mkdir(dir, { recursive: true });
      
      // Generate WhatsApp-compatible HTML
      const html = generateHTML(character, baseHTML, 'page', page.url);
      await writeFile(page.path, html);
      
      results.totalPages++;
      return { success: true, path: page.path };
    } catch (error) {
      results.errors++;
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
    './build/dashboard/discover',
    './build/dashboard/categories',
    './build/generation-summary.json',
    './build/image-validation-report.json'
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

// Setup utilities
async function setupEnvironment(options = { full: true }) {
  const { full } = options;

  console.log('🚀 GigaSpace WhatsApp-Compatible Static Generator Setup\n');

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
  console.log(`📋 Node.js version: ${nodeVersion}`);
  if (majorVersion >= 18) {
    console.log('✅ Node.js 18+ detected - built-in fetch available');
  } else {
    console.log('⚠️  Node.js < 18 detected - using https fallback');
  }

  // Create build directory structure
  console.log('📁 Setting up directory structure...');
  const directories = [
    './build',
    './build/dashboard',
    './build/dashboard/discover',
    './build/dashboard/categories'
  ];
  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created ${dir}`);
    }
  }

  // Create WhatsApp-compatible base HTML template
  if (!fs.existsSync('./build/index.html')) {
    console.log('📄 Creating WhatsApp-compatible HTML template...');
    const whatsAppCompatibleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- CRITICAL: Meta tags first for WhatsApp iOS compatibility -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GigaSpace - AI Character Chat</title>
    <meta name="description" content="Experience conversations with AI characters on GigaSpace">
    
    <!-- WhatsApp OpenGraph Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="GigaSpace">
    <meta property="og:title" content="GigaSpace">
    <meta property="og:description" content="Experience conversations with AI characters">
    <meta property="og:image" content="${CONFIG.DEFAULT_IMAGE}">
    <meta property="og:url" content="${CONFIG.SITE_BASE}">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@gigaspace">
    
    <link rel="icon" href="/favicon.ico">
    <meta name="theme-color" content="#6366f1">
</head>
<body>
    <div id="root">
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1a1a1a;color:white;font-family:system-ui,sans-serif;">
            <div style="text-align:center;">
                <h1>Welcome to GigaSpace</h1>
                <p>Experience conversations with AI characters</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    fs.writeFileSync('./build/index.html', whatsAppCompatibleHTML);
    console.log('✅ Created WhatsApp-compatible HTML template');
  }

  if (full) {
    console.log('\n🔗 Testing API connection...');
    try {
      const testChar = await fetchCharacter(1);
      if (testChar && testChar.name) {
        console.log(`✅ API connection successful - Test character: ${testChar.name}`);
      } else {
        console.log('⚠️  API returned unexpected format');
      }
    } catch (error) {
      console.log(`❌ API connection failed: ${error.message}`);
    }

    console.log('\n📱 WhatsApp iOS Compatibility Features:');
    console.log('✅ Meta tags positioned before CSS/JS');
    console.log('✅ Image validation for 300KB limit');
    console.log('✅ Description length optimization');
    console.log('✅ Deferred resource loading');
    console.log('✅ Enhanced OpenGraph tags');
    
    console.log('\n🎯 Setup Complete! Next steps:');
    console.log('1. Run generation: node generate-static.js --generate');
    console.log('2. Test WhatsApp preview at web.whatsapp.com');
    console.log('3. Check results in build/ and generation-summary.json');
  }
}

// Main generation function
async function generateStatic() {
  console.log('🚀 WHATSAPP-COMPATIBLE TURBO GENERATOR STARTING...');
  console.log('=' .repeat(70));
  
  const startTime = Date.now();
  
  // Step 1: Cleanup
  await cleanup();
  
  // Step 2: Detect target count
  CONFIG.TARGET_COUNT = await detectTargetCount();
  
  // Step 3: Load base HTML (not used in new implementation)
  console.log('📄 Using WhatsApp-compatible HTML generation...');
  
  console.log(`\n📊 WHATSAPP-COMPATIBLE CONFIGURATION:`);
  console.log(`   Target: ${CONFIG.TARGET_COUNT} characters`);
  console.log(`   Concurrency: ${CONFIG.MAX_CONCURRENT}`);
  console.log(`   Image Validation: ${CONFIG.VALIDATE_IMAGES ? 'ON' : 'OFF'}`);
  console.log(`   Max Image Size: ${CONFIG.WHATSAPP_IMAGE_MAX_SIZE / 1024}KB`);
  console.log(`   Max Description: ${CONFIG.MAX_DESCRIPTION_LENGTH} chars`);
  console.log(`   Expected Pages: ~${CONFIG.CREATE_CATEGORY_PAGES ? CONFIG.TARGET_COUNT * 2 : CONFIG.TARGET_COUNT}`);
  console.log('=' .repeat(70));
  
  // Step 4: Start progress display
  console.log('⚡ Starting WhatsApp-compatible generation...\n');
  startProgressDisplay();
  
  // Step 5: Process in chunks with high concurrency
  const semaphore = new Semaphore(CONFIG.MAX_CONCURRENT);
  const characterIds = Array.from({ length: CONFIG.TARGET_COUNT }, (_, i) => i + 1);
  
  const chunkPromises = [];
  for (let i = 0; i < characterIds.length; i += CONFIG.CHUNK_SIZE) {
    const chunk = characterIds.slice(i, i + CONFIG.CHUNK_SIZE);
    chunkPromises.push(processChunk(chunk, null, semaphore)); // baseHTML not needed anymore
  }
  
  // Wait for all chunks to complete
  await Promise.all(chunkPromises);
  
  // Step 6: Stop progress and show results
  stopProgressDisplay();
  
  const duration = (Date.now() - startTime) / 1000;
  const speed = CONFIG.TARGET_COUNT / duration;
  
  console.log(`\n🎉 WHATSAPP-COMPATIBLE GENERATION COMPLETE!`);
  console.log(`⚡ Time: ${(duration / 60).toFixed(2)} minutes`);
  console.log(`⚡ Speed: ${speed.toFixed(1)} characters/second`);
  console.log(`📄 Pages created: ${results.totalPages}`);
  console.log(`✅ Successful: ${results.successful}`);
  console.log(`📝 Missing (defaults): ${results.missing}`);
  console.log(`❌ Errors: ${results.errors}`);
  console.log(`📂 Categories found: ${results.categories.size}`);
  console.log(`\n📱 WHATSAPP COMPATIBILITY:`);
  console.log(`📷 Images validated: ${results.imageValidation.valid}`);
  console.log(`🚫 Images failed validation: ${results.imageValidation.invalid}`);
  console.log(`🖼️  Default images used: ${results.imageValidation.defaultUsed}`);
  console.log(`🔗 URL Format: /dashboard/discover/{id}/{character-name}`);
  
  // Write comprehensive summary
  const summary = {
    timestamp: new Date().toISOString(),
    duration: duration,
    speed: speed,
    whatsAppCompatible: true,
    urlFormat: '/dashboard/discover/{id}/{character-name}',
    stats: {
      total: CONFIG.TARGET_COUNT,
      successful: results.successful,
      missing: results.missing,
      errors: results.errors,
      pages: results.totalPages,
      categories: Array.from(results.categories)
    },
    whatsAppCompatibility: {
      imageValidation: {
        enabled: CONFIG.VALIDATE_IMAGES,
        valid: results.imageValidation.valid,
        invalid: results.imageValidation.invalid,
        defaultUsed: results.imageValidation.defaultUsed,
        maxSizeKB: CONFIG.WHATSAPP_IMAGE_MAX_SIZE / 1024
      },
      metaTags: {
        positionOptimized: true,
        descriptionMaxLength: CONFIG.MAX_DESCRIPTION_LENGTH,
        openGraphComplete: true,
        twitterCardsIncluded: true
      },
      performance: {
        deferredResourceLoading: true,
        crawlerOptimized: true,
        fallbackContentProvided: true
      }
    },
    configuration: {
      apiBase: CONFIG.API_BASE,
      siteBase: CONFIG.SITE_BASE,
      defaultImage: CONFIG.DEFAULT_IMAGE,
      validateImages: CONFIG.VALIDATE_IMAGES,
      maxConcurrent: CONFIG.MAX_CONCURRENT,
      chunkSize: CONFIG.CHUNK_SIZE
    }
  };
  
  try {
    await writeFile('./build/generation-summary.json', JSON.stringify(summary, null, 2));
    console.log('📊 Summary written to generation-summary.json');
  } catch (error) {
    console.warn('⚠️  Could not write summary file');
  }
  
  // Write image validation report
  if (CONFIG.VALIDATE_IMAGES) {
    const imageReport = {
      timestamp: new Date().toISOString(),
      validatedImages: Array.from(imageValidationCache.entries()).map(([url, result]) => ({
        url,
        valid: result.valid,
        reason: result.reason || 'Valid',
        fileSize: result.fileSize || null,
        contentType: result.contentType || null
      })),
      summary: {
        totalValidated: imageValidationCache.size,
        valid: results.imageValidation.valid,
        invalid: results.imageValidation.invalid,
        defaultUsed: results.imageValidation.defaultUsed,
        validationEnabled: CONFIG.VALIDATE_IMAGES,
        maxSizeBytes: CONFIG.WHATSAPP_IMAGE_MAX_SIZE
      },
      whatsAppRequirements: {
        maxFileSize: '300KB',
        supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        recommendedDimensions: '1200x630 (1.91:1 ratio)',
        minimumDimensions: '300x200'
      }
    };
    
    try {
      await writeFile('./build/image-validation-report.json', JSON.stringify(imageReport, null, 2));
      console.log('📷 Image validation report written to image-validation-report.json');
    } catch (error) {
      console.warn('⚠️  Could not write image validation report');
    }
  }
  
  
  console.log('\n🚀 READY FOR WHATSAPP-COMPATIBLE DEPLOYMENT!');
  
  // Additional WhatsApp-specific recommendations
  if (results.imageValidation.invalid > 0) {
    console.log(`\n⚠️  RECOMMENDATION: ${results.imageValidation.invalid} images failed WhatsApp validation.`);
    console.log('   Consider optimizing source images to be under 300KB for better compatibility.');
  }
  
  if (results.errors > 0) {
    console.log(`\n⚠️  WARNING: ${results.errors} pages had generation errors.`);
    console.log('   Check the logs above for specific error details.');
  }
}

// Test WhatsApp preview function
async function testWhatsAppPreview(url) {
  console.log(`\n🧪 Testing WhatsApp preview for: ${url}`);
  
  try {
    let response;
    
    if (typeof fetch !== 'undefined') {
      response = await fetch(url, { timeout: 10000 });
    } else {
      const https = require('https');
      const urlParts = new URL(url);
      
      response = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: urlParts.hostname,
          path: urlParts.pathname + urlParts.search,
          method: 'GET',
          timeout: 10000
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve({ ok: res.statusCode === 200, text: () => body }));
        });
        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
        req.end();
      });
    }
    
    if (!response.ok) {
      console.error(`❌ Page not accessible: HTTP ${response.status || 'Error'}`);
      return false;
    }
    
    const html = await response.text();
    
    // Check for essential WhatsApp meta tags
    const requiredTags = [
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'property="og:url"',
      'property="og:type"'
    ];
    
    const foundTags = requiredTags.filter(tag => html.includes(tag));
    const missingTags = requiredTags.filter(tag => !html.includes(tag));
    
    console.log(`📋 Found ${foundTags.length}/${requiredTags.length} required meta tags`);
    
    if (missingTags.length > 0) {
      console.error(`❌ Missing meta tags: ${missingTags.join(', ')}`);
    }
    
    // Check meta tag positioning
    const ogImageIndex = html.indexOf('property="og:image"');
    const firstStyleIndex = html.indexOf('<style');
    const firstScriptIndex = html.indexOf('<script');
    const cssLinkIndex = html.indexOf('<link rel="stylesheet"');
    
    let positioningIssues = 0;
    
    if (firstStyleIndex > 0 && ogImageIndex > firstStyleIndex) {
      console.warn(`⚠️  Meta tags come after <style> - may cause WhatsApp iOS issues`);
      positioningIssues++;
    }
    
    if (cssLinkIndex > 0 && ogImageIndex > cssLinkIndex) {
      console.warn(`⚠️  Meta tags come after CSS link - may cause WhatsApp iOS issues`);
      positioningIssues++;
    }
    
    // Check for WhatsApp-specific optimizations
    const hasSchemaMarkup = html.includes('itemprop="thumbnailUrl"');
    const hasTwitterCards = html.includes('name="twitter:card"');
    const hasImageDimensions = html.includes('property="og:image:width"');
    
    console.log(`📊 WhatsApp optimizations:`);
    console.log(`   Schema.org markup: ${hasSchemaMarkup ? '✅' : '❌'}`);
    console.log(`   Twitter Cards: ${hasTwitterCards ? '✅' : '❌'}`);
    console.log(`   Image dimensions: ${hasImageDimensions ? '✅' : '❌'}`);
    console.log(`   Positioning issues: ${positioningIssues === 0 ? '✅ None' : `❌ ${positioningIssues}`}`);
    
    const isOptimized = missingTags.length === 0 && positioningIssues === 0 && hasSchemaMarkup && hasTwitterCards;
    
    if (isOptimized) {
      console.log(`✅ WhatsApp preview optimization: PASSED`);
    } else {
      console.log(`⚠️  WhatsApp preview optimization: NEEDS IMPROVEMENT`);
    }
    
    return isOptimized;
    
  } catch (error) {
    console.error(`❌ WhatsApp preview test failed: ${error.message}`);
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  (async () => {
    try {
      const args = process.argv.slice(2);
      const wantsSetup = args.includes('--setup');
      const wantsGenerate = args.includes('--generate');
      const wantsTest = args.includes('--test');
      const testUrl = args.find(arg => arg.startsWith('--test-url='))?.split('=')[1];

      if (wantsTest && testUrl) {
        await testWhatsAppPreview(testUrl);
      } else if (wantsSetup && !wantsGenerate) {
        await setupEnvironment({ full: true });
      } else if (!wantsSetup && wantsGenerate) {
        // Minimal setup before generation
        await setupEnvironment({ full: false });
        await generateStatic();
      } else if (wantsSetup && wantsGenerate) {
        await setupEnvironment({ full: true });
        await generateStatic();
      } else {
        // Default: minimal setup then generate
        console.log('🚀 Running WhatsApp-compatible static generation...\n');
        await setupEnvironment({ full: false });
        await generateStatic();
      }
      
      process.exit(0);
    } catch (error) {
      stopProgressDisplay();
      console.error('\n❌ GENERATION FAILED:', error.message);
      console.error('Stack trace:', error.stack);
      process.exit(1);
    }
  })();
}

module.exports = { 
  generateStatic, 
  setupEnvironment, 
  testWhatsAppPreview,
  validateImageForWhatsApp,
  CONFIG 
};
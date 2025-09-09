// setup.js - Quick setup and dependency check script
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 GigaSpace Static Generator Setup\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

console.log(`📋 Node.js version: ${nodeVersion}`);

if (majorVersion >= 18) {
  console.log('✅ Node.js 18+ detected - built-in fetch available');
} else {
  console.log('⚠️  Node.js < 18 detected - using https fallback');
}

// Check if package.json exists
if (!fs.existsSync('./package.json')) {
  console.log('📦 Creating package.json...');
  const packageJson = {
    "name": "gigaspace-static-generator",
    "version": "1.0.0",
    "description": "Static site generator for GigaSpace character pages",
    "main": "generate-static.js",
    "scripts": {
      "generate": "node generate-static.js",
      "build": "echo 'Build process - replace with your actual build command'",
      "setup": "node setup.js"
    },
    "dependencies": {},
    "devDependencies": {}
  };
  
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  console.log('✅ package.json created');
}

// Create build directory structure if it doesn't exist
console.log('📁 Setting up directory structure...');

const directories = [
  './build',
  './build/dashboard',
  './build/dashboard/discover',
  './build/dashboard/discover/chat'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created ${dir}`);
  }
});

// Create a basic index.html template if it doesn't exist
if (!fs.existsSync('./build/index.html')) {
  console.log('📄 Creating basic HTML template...');
  
  const basicHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GigaSpace - AI Character Chat</title>
    <meta name="description" content="Experience conversations with AI characters">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="GigaSpace">
    <link rel="icon" href="/favicon.ico">
</head>
<body>
    <div id="root">
        <div class="character-chat-container">
            <h1>Welcome to GigaSpace</h1>
            <p>Experience conversations with AI characters</p>
            <!-- Your React app or other content will be injected here -->
        </div>
    </div>
    <script>
        // Your application scripts here
        console.log('GigaSpace Character Chat loaded');
    </script>
</body>
</html>`;
  
  fs.writeFileSync('./build/index.html', basicHTML);
  console.log('✅ Created basic HTML template');
}

// Test API connection
async function testAPIConnection() {
  console.log('\n🔗 Testing API connection...');
  
  try {
    const https = require('https');
    const testUrl = 'https://space.gigaspace.org/getcharacter/1';
    
    const response = await new Promise((resolve, reject) => {
      const req = https.request(testUrl, { method: 'GET' }, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: body
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
    
    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      console.log('✅ API connection successful');
      console.log(`📡 Test character: ${data.name} (ID: ${data.id})`);
    } else {
      console.log(`⚠️  API returned status: ${response.statusCode}`);
    }
    
  } catch (error) {
    console.log(`❌ API connection failed: ${error.message}`);
    console.log('⚠️  The generator will still work with fallback data');
  }
}

// Check available memory
const totalMemory = Math.round(require('os').totalmem() / 1024 / 1024 / 1024);
const freeMemory = Math.round(require('os').freemem() / 1024 / 1024 / 1024);

console.log(`\n💾 System Memory: ${freeMemory}GB free / ${totalMemory}GB total`);

if (freeMemory < 1) {
  console.log('⚠️  Low memory detected - consider reducing BATCH_SIZE in config');
}

// Final setup steps
console.log('\n🎯 Setup Complete! Next steps:');
console.log('1. Customize CONFIG in generate-static.js if needed');
console.log('2. Run: node generate-static.js');
console.log('3. Check results in build/ directory and generation-summary.json');

// Test API connection
testAPIConnection();
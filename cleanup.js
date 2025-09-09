// cleanup.js - Standalone script to clean old generation data
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

async function cleanupAll() {
  console.log('🧹 GigaSpace Static Generator - Cleanup Tool');
  console.log('=' .repeat(50));
  const startTime = Date.now();
  
  let cleanedFiles = 0;
  let cleanedDirs = 0;
  let totalSize = 0;
  
  try {
    // Function to calculate directory size and count files
    async function calculateDirectoryStats(dirPath) {
      if (!fs.existsSync(dirPath)) return { files: 0, size: 0 };
      
      let files = 0;
      let size = 0;
      
      const items = await readdir(dirPath);
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = await stat(itemPath);
        
        if (stats.isDirectory()) {
          const subStats = await calculateDirectoryStats(itemPath);
          files += subStats.files;
          size += subStats.size;
        } else {
          files++;
          size += stats.size;
        }
      }
      
      return { files, size };
    }
    
    // Calculate current generation data size
    const pathsToCheck = [
      './build/dashboard/discover/chat',
      './build/dashboard/categories',
      './build/generation-summary.json'
    ];
    
    console.log('📊 Analyzing existing generation data...');
    
    for (const checkPath of pathsToCheck) {
      if (fs.existsSync(checkPath)) {
        if (checkPath.endsWith('.json')) {
          const stats = await stat(checkPath);
          totalSize += stats.size;
          console.log(`   📄 ${path.basename(checkPath)}: ${(stats.size / 1024).toFixed(2)} KB`);
        } else {
          const dirStats = await calculateDirectoryStats(checkPath);
          totalSize += dirStats.size;
          console.log(`   📁 ${path.basename(checkPath)}/: ${dirStats.files} files, ${(dirStats.size / 1024 / 1024).toFixed(2)} MB`);
        }
      }
    }
    
    if (totalSize === 0) {
      console.log('✅ No existing generation data found. Nothing to clean.');
      return;
    }
    
    console.log(`\n📊 Total data to clean: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log('\n🗑️  Starting cleanup...');
    
    // Remove generation summary if it exists
    if (fs.existsSync('./build/generation-summary.json')) {
      await unlink('./build/generation-summary.json');
      cleanedFiles++;
      console.log('   ✅ Removed generation-summary.json');
    }
    
    // Function to recursively delete directory contents
    async function deleteDirectoryContents(dirPath, displayName) {
      if (!fs.existsSync(dirPath)) {
        return;
      }
      
      console.log(`   🗂️  Cleaning ${displayName}...`);
      
      try {
        // Use the most compatible method based on Node.js version
        if (fs.rmSync) {
          // Node.js 14.14.0+
          fs.rmSync(dirPath, { recursive: true, force: true });
          cleanedDirs++;
          console.log(`   ✅ Cleaned ${displayName}`);
        } else {
          // Fallback for older Node.js versions
          const items = await readdir(dirPath);
          
          for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stats = await stat(itemPath);
            
            if (stats.isDirectory()) {
              await deleteDirectoryContents(itemPath, `${displayName}/${item}`);
              try {
                await rmdir(itemPath);
                cleanedDirs++;
              } catch (error) {
                // Directory might not be empty, try system command
                const { execSync } = require('child_process');
                const isWindows = process.platform === 'win32';
                const command = isWindows ? `rmdir /s /q "${itemPath}"` : `rm -rf "${itemPath}"`;
                execSync(command, { stdio: 'ignore' });
                cleanedDirs++;
              }
            } else {
              await unlink(itemPath);
              cleanedFiles++;
            }
          }
        }
      } catch (error) {
        console.warn(`   ⚠️  Could not fully clean ${displayName}: ${error.message}`);
      }
    }
    
    // Clean discover directory and its contents
    if (fs.existsSync('./build/dashboard/discover')) {
      await deleteDirectoryContents('./build/dashboard/discover', 'discover');
    }
    
    // Clean categories directory
    if (fs.existsSync('./build/dashboard/categories')) {
      await deleteDirectoryContents('./build/dashboard/categories', 'categories');
    }
    
    // Clean dashboard directory if empty
    if (fs.existsSync('./build/dashboard')) {
      try {
        const dashboardItems = await readdir('./build/dashboard');
        if (dashboardItems.length === 0) {
          await rmdir('./build/dashboard');
          console.log('   ✅ Removed empty dashboard directory');
        }
      } catch (error) {
        console.warn('   ⚠️  Could not remove dashboard directory:', error.message);
      }
    }
    
    const cleanupTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n🎉 CLEANUP COMPLETE!');
    console.log(`   Files removed: ${cleanedFiles}`);
    console.log(`   Directories cleaned: ${cleanedDirs}`);
    console.log(`   Data freed: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Time taken: ${cleanupTime}s`);
    console.log('\n✅ Ready for fresh generation!');
    
    return true;
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    return false;
  }
}

// Run cleanup if called directly
if (require.main === module) {
  cleanupAll()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Cleanup failed:', error.message);
      process.exit(1);
    });
}

module.exports = { cleanupAll };
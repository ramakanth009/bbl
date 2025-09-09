// setup.js - Thin wrapper for backward compatibility
console.log('ℹ️  setup.js is deprecated. Use `node generate-static.js --setup` instead.');

async function main() {
  try {
    const { setupEnvironment } = require('./generate-static');
    await setupEnvironment({ full: true });
  } catch (err) {
    console.error('❌ Setup failed:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
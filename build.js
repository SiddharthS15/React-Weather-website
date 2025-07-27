// build.js - Create config.js from environment variable for Vercel
const fs = require('fs');

// Get API key from environment variable
const apiKey = process.env.API_KEY;

if (!apiKey) {
    console.error('API_KEY environment variable is required!');
    process.exit(1);
}

// Create config.js with the API key
const configContent = `// config.js - Generated at build time
const API_KEY = "${apiKey}";
`;

// Write the config file
fs.writeFileSync('config.js', configContent);

console.log('Build completed - config.js created with API key');

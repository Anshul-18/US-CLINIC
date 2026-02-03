#!/usr/bin/env node

/**
 * Setup Script for US-CLINIC
 * This script helps initialize the project by creating .env files from examples
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

async function setup() {
  console.log('\n🏥 Welcome to US-CLINIC Setup!\n');
  console.log('This script will help you configure your environment variables.\n');

  // Check if .env files already exist
  const backendEnvExists = fs.existsSync(path.join(__dirname, 'backend', '.env'));
  const frontendEnvExists = fs.existsSync(path.join(__dirname, 'frontend', '.env'));

  if (backendEnvExists || frontendEnvExists) {
    const overwrite = await prompt('⚠️  .env files already exist. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('\n✅ Setup cancelled. Your existing .env files are preserved.\n');
      rl.close();
      return;
    }
  }

  console.log('\n📝 Please provide the following information:\n');

  // Backend Configuration
  console.log('--- Backend Configuration ---\n');
  
  const port = await prompt('Server port (default: 5000): ') || '5000';
  const nodeEnv = await prompt('Environment (development/production, default: development): ') || 'development';
  
  console.log('\n💾 MongoDB Configuration:');
  console.log('1. Local MongoDB: mongodb://127.0.0.1:27017/dentistApp');
  console.log('2. MongoDB Atlas: mongodb+srv://...\n');
  const mongoUri = await prompt('MongoDB URI: ') || 'mongodb://127.0.0.1:27017/dentistApp';
  
  const corsOrigin = await prompt('CORS Origin (default: http://localhost:3000): ') || 'http://localhost:3000';
  
  console.log('\n💳 Stripe Configuration:');
  const stripeSecret = await prompt('Stripe Secret Key: ');
  
  console.log('\n🔐 JWT Configuration:');
  const jwtSecret = await prompt('JWT Secret (press Enter to generate random): ');
  const finalJwtSecret = jwtSecret || require('crypto').randomBytes(32).toString('hex');
  const jwtExpire = await prompt('JWT Expiration (default: 7d): ') || '7d';

  // Frontend Configuration
  console.log('\n--- Frontend Configuration ---\n');
  
  const apiUrl = await prompt('API URL (default: http://localhost:5000): ') || 'http://localhost:5000';
  const stripePublishable = await prompt('Stripe Publishable Key: ');

  // Create backend .env
  const backendEnv = `# Server Configuration
PORT=${port}
NODE_ENV=${nodeEnv}

# MongoDB Configuration
MONGODB_URI=${mongoUri}

# CORS Configuration
CORS_ORIGIN=${corsOrigin}

# Stripe Configuration
STRIPE_SECRET_KEY=${stripeSecret}

# JWT Configuration
JWT_SECRET=${finalJwtSecret}
JWT_EXPIRE=${jwtExpire}

# WhatsApp Configuration (optional)
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER=
`;

  // Create frontend .env
  const frontendEnv = `# API Configuration
REACT_APP_API_URL=${apiUrl}

# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=${stripePublishable}
`;

  // Write files
  try {
    fs.writeFileSync(path.join(__dirname, 'backend', '.env'), backendEnv);
    fs.writeFileSync(path.join(__dirname, 'frontend', '.env'), frontendEnv);
    
    console.log('\n✅ Configuration files created successfully!\n');
    console.log('📁 Created:');
    console.log('   - backend/.env');
    console.log('   - frontend/.env\n');
    console.log('🚀 Next steps:');
    console.log('   1. Start MongoDB (if using local): mongod');
    console.log('   2. Install dependencies: npm run install-all');
    console.log('   3. Start backend: npm run dev');
    console.log('   4. Start frontend: npm run client\n');
  } catch (error) {
    console.error('\n❌ Error creating configuration files:', error.message);
  }

  rl.close();
}

setup().catch(error => {
  console.error('Error during setup:', error);
  rl.close();
  process.exit(1);
});

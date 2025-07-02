#!/bin/bash
# NPM Fix Script for Tailwind CSS Issues

echo "🔧 Fixing npm and Tailwind CSS setup..."

# Remove existing node_modules and lock files
echo "📁 Cleaning existing installation..."
rm -rf node_modules
rm -f package-lock.json
rm -rf .vite

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Verify Tailwind installation
echo "✅ Verifying Tailwind CSS installation..."
npm list tailwindcss
npm list @tailwindcss/forms 2>/dev/null || npm install @tailwindcss/forms
npm list tailwindcss-animate

echo "🎉 Setup complete! Try running 'npm run dev' now."
#!/bin/bash

echo "🚀 Setting up Client Scoping Platform..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo "📄 Creating environment files..."

# Create frontend .env if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
else
    echo "⚠️  .env already exists, skipping..."
fi

# Create server .env if it doesn't exist
if [ ! -f "server/.env" ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env from server/.env.example"
    echo ""
    echo "🔧 IMPORTANT: You need to edit server/.env with your actual MongoDB credentials!"
    echo "   Edit server/.env and replace:"
    echo "   - YOUR_USERNAME with your MongoDB username"
    echo "   - YOUR_PASSWORD with your MongoDB password"
    echo "   - YOUR_CLUSTER with your MongoDB cluster URL"
    echo "   - YOUR_DATABASE with your database name"
    echo "   - YOUR_APP_NAME with your app name"
else
    echo "⚠️  server/.env already exists, skipping..."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit server/.env with your MongoDB credentials"
echo "2. Run 'npm run dev' to start the frontend"
echo "3. Run 'cd server && npm start' to start the backend"
echo ""
echo "🔗 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001"
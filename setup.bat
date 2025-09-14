@echo off
echo 🚀 Setting up Client Scoping Platform...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

echo 📦 Installing frontend dependencies...
call npm install

echo 📦 Installing server dependencies...
cd server
call npm install
cd ..

echo 📄 Creating environment files...

REM Create frontend .env if it doesn't exist
if not exist ".env" (
    copy ".env.example" ".env" >nul
    echo ✅ Created .env from .env.example
) else (
    echo ⚠️  .env already exists, skipping...
)

REM Create server .env if it doesn't exist
if not exist "server\.env" (
    copy "server\.env.example" "server\.env" >nul
    echo ✅ Created server/.env from server/.env.example
    echo.
    echo 🔧 IMPORTANT: You need to edit server/.env with your actual MongoDB credentials!
    echo    Edit server/.env and replace:
    echo    - YOUR_USERNAME with your MongoDB username
    echo    - YOUR_PASSWORD with your MongoDB password
    echo    - YOUR_CLUSTER with your MongoDB cluster URL
    echo    - YOUR_DATABASE with your database name
    echo    - YOUR_APP_NAME with your app name
) else (
    echo ⚠️  server/.env already exists, skipping...
)

echo.
echo 🎉 Setup complete!
echo.
echo 📝 Next steps:
echo 1. Edit server/.env with your MongoDB credentials
echo 2. Run 'npm run dev' to start the frontend
echo 3. Run 'cd server && npm start' to start the backend
echo.
echo 🔗 The app will be available at:
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:3001

pause
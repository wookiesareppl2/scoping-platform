# Client Scoping Platform - Setup Guide

## 🚀 Quick Setup

### **Automated Setup (Recommended)**

**For Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```cmd
setup.bat
```

### **Manual Setup**

1. **Clone and Install**
   ```bash
   git clone https://github.com/wookiesareppl2/scoping-platform.git
   cd scoping-platform
   npm install
   cd server && npm install && cd ..
   ```

2. **Create Environment Files**
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   ```

3. **Configure MongoDB Credentials**
   
   Edit `server/.env` and replace the placeholder values:
   ```env
   MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE?retryWrites=true&w=majority&appName=YOUR_APP_NAME
   PORT=3001
   NODE_ENV=development
   ```

   **Current MongoDB Details:**
   - Username: `wookie`
   - Password: `SLK@wookie_1`
   - Cluster: `scoping-platform.mg6mymf.mongodb.net`
   - Database: `scoping-platform`
   - App Name: `scoping-platform`

4. **Start the Application**
   ```bash
   # Terminal 1 - Frontend
   npm run dev
   
   # Terminal 2 - Backend
   cd server
   npm start
   ```

## 🔗 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 🔧 Development Tools

### **Available Scripts**
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run ESLint

# Backend
cd server
npm start            # Start server
npm run dev          # Start with nodemon (if available)
```

### **Testing Utilities**
In development mode, open browser console and access:
```javascript
// Test form submissions
window.testingUtility.testFormSubmissions()

// Test API endpoints
window.testingUtility.testApiEndpoints()

// Run all tests
window.testingUtility.runAllTests()
```

### **Environment Configuration**
Access environment config in browser console:
```javascript
// View current configuration
window.environmentConfig.getConfig()

// Check feature flags
window.environmentConfig.getFeatureFlags()
```

## 🔒 Security Notes

- **Never commit `.env` files** - They contain sensitive credentials
- **Rotate MongoDB credentials** if you suspect they've been compromised
- **Use different credentials** for production environments
- **Keep `.env.example` files updated** with new configuration options

## 🐛 Troubleshooting

### **Common Issues**

1. **MongoDB Connection Failed**
   - Check your internet connection
   - Verify MongoDB Atlas cluster is running
   - Confirm credentials in `server/.env` are correct
   - Check MongoDB Atlas network access settings

2. **Port Already in Use**
   - Frontend (5173): Change in `vite.config.js`
   - Backend (3001): Change `PORT` in `server/.env`

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again
   - For server: `cd server && rm -rf node_modules package-lock.json && npm install`

4. **Build Errors**
   - Ensure all dependencies are installed
   - Check for TypeScript errors (if any)
   - Verify all imports are correct

## 📋 Project Structure

```
scoping-platform/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
├── server/                # Backend Node.js/Express server
│   ├── middleware/        # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── .env              # Server environment variables (create this)
├── .env                  # Frontend environment variables (create this)
└── README.md            # Project documentation
```

## 🎯 Features

- **Budget-Aware Scoping** - Professional budget tier selection
- **Security** - Input validation, rate limiting, error monitoring
- **Performance** - Optimized React components, monitoring
- **Testing** - Comprehensive test utilities
- **SEO Ready** - Meta tags and structured data
- **Development Tools** - Logging, debugging, test data generation
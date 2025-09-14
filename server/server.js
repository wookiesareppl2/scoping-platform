require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize MongoDB connection status
let isMongoConnected = false;

// In-memory storage for development fallback
let submissions = [];
let submissionCounter = 1;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: isMongoConnected ? 'Server connected to MongoDB Atlas' : 'Server using in-memory storage',
    database: isMongoConnected ? 'MongoDB Atlas' : 'In-Memory',
    submissions: isMongoConnected ? 'Check /api/forms' : submissions.length
  });
});

// Test endpoint to create a sample submission (development only)
app.post('/api/test/create-submission', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Test endpoint not available in production' });
  }

  const testSubmission = {
    answers: {
      company_name: 'Test Company Ltd',
      industry: 'Technology',
      target_audience: 'Small businesses looking for digital solutions',
      business_goals: 'Increase online presence and generate leads',
      budget_tier: 'full-budget',
      website_type: 'business-advanced',
      existing_website: 'No, this is a new website',
      domain_hosting: 'Yes, both domain and hosting',
      content_ready: 'Some content is ready',
      pages_needed: '6-10 pages',
      special_features: ['Contact forms', 'Blog/news section'],
      design_style: 'Modern and minimalist',
      brand_colors: 'Yes, we have specific brand colors',
      launch_deadline: 'Within 1-2 months',
      budget_range: '$5,000-$10,000',
      third_party_tools: ['Google Analytics', 'Social media platforms'],
      analytics_tracking: ['Google Analytics', 'Conversion tracking']
    }
  };

  // Use the same submission logic as the main endpoint
  if (isMongoConnected) {
    // This will be handled by MongoDB routes
    return res.status(200).json({ message: 'Use POST /api/forms/submit for MongoDB submissions' });
  } else {
    // In-memory storage
    const submission = {
      _id: submissionCounter++,
      answers: testSubmission.answers,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        submittedAt: new Date()
      },
      status: 'submitted'
    };

    submissions.push(submission);
    res.status(201).json({
      message: 'Test submission created successfully',
      submissionId: submission._id,
      submission: submission
    });
  }
});

// Connect to MongoDB first

if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('<db_password>')) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB Atlas');
      isMongoConnected = true;

      // Load MongoDB routes
      const formRoutes = require('./routes/formRoutes');
      app.use('/api/forms', formRoutes);
      console.log('📊 Using MongoDB for data persistence');
    })
    .catch(err => {
      console.log('❌ MongoDB connection failed, using in-memory storage:', err.message);
      console.log('🔧 Check your connection string and network access in MongoDB Atlas');
      setupFallbackRoutes();
    });
} else {
  console.log('MongoDB credentials not configured, using in-memory storage for development');
  setupFallbackRoutes();
}

// Fallback routes for in-memory storage
function setupFallbackRoutes() {
  app.post('/api/forms/submit', (req, res) => {
    try {
      const { answers } = req.body;

      if (!answers || typeof answers !== 'object') {
        return res.status(400).json({ error: 'Invalid form data' });
      }

      const submission = {
        _id: submissionCounter++,
        answers,
        metadata: {
          ipAddress: req.ip,
          userAgent: req.get('user-agent'),
          submittedAt: new Date()
        },
        status: 'submitted'
      };

      submissions.push(submission);

      res.status(201).json({
        message: 'Form submitted successfully (in-memory)',
        submissionId: submission._id
      });

    } catch (error) {
      console.error('Form submission error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/forms', (req, res) => {
    try {
      res.json(submissions.sort((a, b) => new Date(b.metadata.submittedAt) - new Date(a.metadata.submittedAt)));
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/forms/:id', (req, res) => {
    try {
      const submission = submissions.find(s => s._id == req.params.id);
      if (!submission) {
        return res.status(404).json({ error: 'Submission not found' });
      }
      res.json(submission);
    } catch (error) {
      console.error('Error fetching submission:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  console.log('📝 In-memory fallback routes configured');
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log('Using in-memory storage for development');
});

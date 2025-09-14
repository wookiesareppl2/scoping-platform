const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');

// Submit a new form
router.post('/submit', async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Basic validation
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Invalid form data' });
    }

    // Create new form submission
    const submission = new FormSubmission({
      answers,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      }
    });

    await submission.save();
    
    res.status(201).json({ 
      message: 'Form submitted successfully',
      submissionId: submission._id 
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all form submissions (for admin)
router.get('/', async (req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ 'metadata.submittedAt': -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a single submission
router.get('/:id', async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

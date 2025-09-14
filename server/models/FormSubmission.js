const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['submitted', 'reviewed', 'contacted', 'archived'],
    default: 'submitted'
  }
});

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);

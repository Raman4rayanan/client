const mongoose = require('mongoose');
const { portfolioDb } = require('../../config/db');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  gradient: {
    type: String,
    default: 'linear-gradient(135deg, #0F4C81, #0B1F3A)'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind schema specifically to portfolioDb connection
const Activity = portfolioDb.model('Activity', ActivitySchema, 'activities');

module.exports = Activity;

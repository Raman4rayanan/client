const mongoose = require('mongoose');
const { adminDb } = require('../../config/db');

const SessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to adminDb
const Session = adminDb.model('Session', SessionSchema, 'sessions');

module.exports = Session;

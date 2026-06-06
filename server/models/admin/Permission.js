const mongoose = require('mongoose');
const { adminDb } = require('../../config/db');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to adminDb
const Permission = adminDb.model('Permission', PermissionSchema, 'permissions');

module.exports = Permission;

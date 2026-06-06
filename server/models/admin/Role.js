const mongoose = require('mongoose');
const { adminDb } = require('../../config/db');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to adminDb
const Role = adminDb.model('Role', RoleSchema, 'roles');

module.exports = Role;

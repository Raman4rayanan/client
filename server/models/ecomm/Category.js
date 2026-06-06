const mongoose = require('mongoose');
const { ecommDb } = require('../../config/db');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to ecommDb
const Category = ecommDb.model('Category', CategorySchema, 'categories');

module.exports = Category;

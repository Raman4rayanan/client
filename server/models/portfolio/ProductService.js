const mongoose = require('mongoose');
const { portfolioDb } = require('../../config/db');

const ProductServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind schema specifically to portfolioDb connection
const ProductService = portfolioDb.model('ProductService', ProductServiceSchema, 'product_services');

module.exports = ProductService;

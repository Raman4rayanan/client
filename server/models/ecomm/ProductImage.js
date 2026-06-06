const mongoose = require('mongoose');
const { ecommDb } = require('../../config/db');

const ProductImageSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to ecommDb
const ProductImage = ecommDb.model('ProductImage', ProductImageSchema, 'product_images');

module.exports = ProductImage;

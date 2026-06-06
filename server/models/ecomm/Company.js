const mongoose = require('mongoose');
const { ecommDb } = require('../../config/db');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to ecommDb
const Company = ecommDb.model('Company', CompanySchema, 'companies');

module.exports = Company;

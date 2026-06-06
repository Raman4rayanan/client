const mongoose = require('mongoose');
const { adminDb } = require('../../config/db');

const DashboardMetricSchema = new mongoose.Schema({
  metricName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Bind specifically to adminDb
const DashboardMetric = adminDb.model('DashboardMetric', DashboardMetricSchema, 'dashboard_metrics');

module.exports = DashboardMetric;

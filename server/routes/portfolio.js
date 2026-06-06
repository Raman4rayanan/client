const express = require('express');
const router = express.Router();
const {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getServices,
  createService,
  updateService,
  deleteService,
  createInquiry
} = require('../controllers/portfolioController');

// Activities Endpoints
router.route('/activities')
  .get(getActivities)
  .post(createActivity);

router.route('/activities/:id')
  .put(updateActivity)
  .delete(deleteActivity);

// Product Services Endpoints
router.route('/services')
  .get(getServices)
  .post(createService);

router.route('/services/:id')
  .put(updateService)
  .delete(deleteService);

// Inquiry Endpoint
router.post('/inquiries', createInquiry);

module.exports = router;

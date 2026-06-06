const Activity = require('../models/portfolio/Activity');
const ProductService = require('../models/portfolio/ProductService');
const Inquiry = require('../models/portfolio/Inquiry');

// ===== ACTIVITIES CONTROLLER =====
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const { title, subtitle, image, gradient } = req.body;
    if (!title || !subtitle || !image) {
      return res.status(400).json({ success: false, error: 'Title, subtitle, and image are required.' });
    }
    const newActivity = await Activity.create({ title, subtitle, image, gradient });
    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image, gradient } = req.body;
    
    let activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found.' });
    }

    activity = await Activity.findByIdAndUpdate(
      id,
      { title, subtitle, image, gradient },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found.' });
    }
    await Activity.findByIdAndDelete(id);
    res.json({ success: true, message: 'Activity deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// ===== PRODUCT SERVICES CONTROLLER =====
exports.getServices = async (req, res) => {
  try {
    const services = await ProductService.find().sort({ createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, icon, image, desc } = req.body;
    if (!title || !icon || !image || !desc) {
      return res.status(400).json({ success: false, error: 'Title, icon, image, and desc are required.' });
    }
    const newService = await ProductService.create({ title, icon, image, desc });
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, image, desc } = req.body;

    let service = await ProductService.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found.' });
    }

    service = await ProductService.findByIdAndUpdate(
      id,
      { title, icon, image, desc },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await ProductService.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found.' });
    }
    await ProductService.findByIdAndDelete(id);
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// ===== INQUIRIES CONTROLLER =====
exports.createInquiry = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, phone, and message are required.' });
    }
    const newInquiry = await Inquiry.create({ name, phone, email, message });
    res.status(201).json({ success: true, data: newInquiry, message: 'Inquiry saved successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

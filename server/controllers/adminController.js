// Import models from all three segregated databases to show cross-database accessibility for the Admin panel
const Inquiry = require('../models/portfolio/Inquiry');
const Activity = require('../models/portfolio/Activity');
const ProductService = require('../models/portfolio/ProductService');

const Category = require('../models/ecomm/Category');
const Product = require('../models/ecomm/Product');
const Company = require('../models/ecomm/Company');

const User = require('../models/admin/User');
const DashboardMetric = require('../models/admin/DashboardMetric');

// Get overall stats across all 3 databases
exports.getCrossDatabaseStats = async (req, res) => {
  try {
    // 1. Fetch count from cts_portfolio
    const inquiryCount = await Inquiry.countDocuments();
    const activityCount = await Activity.countDocuments();
    const serviceCount = await ProductService.countDocuments();

    // 2. Fetch count from cts_ecomm (Structure only)
    const categoryCount = await Category.countDocuments();
    const productCount = await Product.countDocuments();
    const companyCount = await Company.countDocuments();

    // 3. Fetch count/metrics from cts_admin
    const userCount = await User.countDocuments();
    const metrics = await DashboardMetric.find();

    res.json({
      success: true,
      data: {
        portfolio: {
          inquiries: inquiryCount,
          activities: activityCount,
          services: serviceCount
        },
        ecommerce: {
          categories: categoryCount,
          products: productCount,
          companies: companyCount
        },
        admin: {
          users: userCount,
          metrics: metrics
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

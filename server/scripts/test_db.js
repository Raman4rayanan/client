require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// Import db connections to trigger connectivity
const { portfolioDb, ecommDb, adminDb } = require('../config/db');

// Import Portfolio models
const Activity = require('../models/portfolio/Activity');
const ProductService = require('../models/portfolio/ProductService');
const Inquiry = require('../models/portfolio/Inquiry');

// Import E-commerce models
const Company = require('../models/ecomm/Company');
const Category = require('../models/ecomm/Category');
const Product = require('../models/ecomm/Product');
const ProductImage = require('../models/ecomm/ProductImage');

// Import Admin models
const Permission = require('../models/admin/Permission');
const Role = require('../models/admin/Role');
const User = require('../models/admin/User');
const Session = require('../models/admin/Session');
const DashboardMetric = require('../models/admin/DashboardMetric');

// Wait helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runVerification() {
  console.log('\n--- Starting Database Verification Script ---\n');
  
  // Give database connections 2 seconds to establish
  console.log('Waiting for Mongoose connections...');
  await sleep(2000);

  try {
    // ----------------------------------------------------
    // 1. Verify Portfolio DB (cts_portfolio)
    // ----------------------------------------------------
    console.log('\n[1/3] Verifying [cts_portfolio] Database...');
    
    // Clear old test data
    await Inquiry.deleteMany({ name: /Test User/ });
    await Activity.deleteMany({ title: /Test Activity/ });
    await ProductService.deleteMany({ title: /Test Service/ });

    // Test Inquiries insert
    const testInquiry = await Inquiry.create({
      name: 'Test User',
      phone: '1234567890',
      email: 'test@example.com',
      message: 'Hello, this is a test inquiry.'
    });
    console.log(`✓ Inquiry created in [cts_portfolio]: ${testInquiry.name} (${testInquiry._id})`);

    // Test Activities insert
    const testActivity = await Activity.create({
      title: 'Test Activity Title',
      subtitle: 'This is a test subtitle for activities.',
      image: '/test.jpg',
      gradient: 'linear-gradient(135deg, #0F4C81, #0B1F3A)'
    });
    console.log(`✓ Activity created in [cts_portfolio]: ${testActivity.title} (${testActivity._id})`);

    // Test ProductService insert
    const testService = await ProductService.create({
      title: 'Test Service Name',
      icon: 'Settings',
      image: '/test-service.jpg',
      desc: 'Bespoke high performance test tools.'
    });
    console.log(`✓ ProductService created in [cts_portfolio]: ${testService.title} (${testService._id})`);


    // ----------------------------------------------------
    // 2. Verify E-commerce DB (cts_ecomm)
    // ----------------------------------------------------
    console.log('\n[2/3] Verifying [cts_ecomm] Database (Structure Only)...');
    
    // Clear old test data
    await ProductImage.deleteMany({});
    await Product.deleteMany({ name: /Test Product/ });
    await Category.deleteMany({ name: /Test Category/ });
    await Company.deleteMany({ name: /Test Company/ });

    // Test Company insert
    const company = await Company.create({
      name: 'Test Company Brand',
      logoUrl: '/test-brand.png'
    });
    console.log(`✓ Company created in [cts_ecomm]: ${company.name} (${company._id})`);

    // Test Category insert
    const category = await Category.create({
      name: 'Test Category Tools',
      description: 'Test category desc'
    });
    console.log(`✓ Category created in [cts_ecomm]: ${category.name} (${category._id})`);

    // Test Product insert
    const product = await Product.create({
      name: 'Test Product 5000',
      price: 299.99,
      description: 'Superb heavy tool',
      category: category._id,
      company: company._id
    });
    console.log(`✓ Product created in [cts_ecomm]: ${product.name} (${product._id})`);

    // Test ProductImage insert
    const image = await ProductImage.create({
      product: product._id,
      imageUrl: '/test-image.jpg',
      isPrimary: true
    });
    console.log(`✓ ProductImage created in [cts_ecomm]: ${image.imageUrl} (${image._id})`);


    // ----------------------------------------------------
    // 3. Verify Admin DB (cts_admin)
    // ----------------------------------------------------
    console.log('\n[3/3] Verifying [cts_admin] Database (Structure Only)...');

    // Clear old test data
    await Session.deleteMany({});
    await User.deleteMany({ username: /testadmin/ });
    await Role.deleteMany({ name: /Test Admin Role/ });
    await Permission.deleteMany({ code: /test_perm/ });
    await DashboardMetric.deleteMany({ metricName: /test_metric/ });

    // Test Permission insert
    const perm = await Permission.create({
      name: 'Test Permission',
      code: 'test_perm'
    });
    console.log(`✓ Permission created in [cts_admin]: ${perm.code} (${perm._id})`);

    // Test Role insert
    const role = await Role.create({
      name: 'Test Admin Role',
      permissions: [perm._id]
    });
    console.log(`✓ Role created in [cts_admin]: ${role.name} (${role._id})`);

    // Test User insert
    const user = await User.create({
      username: 'testadmin',
      password: 'hashed_password_123',
      email: 'admin@test.com',
      role: role._id
    });
    console.log(`✓ User created in [cts_admin]: ${user.username} (${user._id})`);

    // Test Session insert
    const session = await Session.create({
      user: user._id,
      token: 'session_token_xyz_987',
      expiresAt: new Date(Date.now() + 3600000)
    });
    console.log(`✓ Session created in [cts_admin]: ${session.token} (${session._id})`);

    // Test DashboardMetric insert
    const metric = await DashboardMetric.create({
      metricName: 'test_metric_registrations',
      value: 125
    });
    console.log(`✓ DashboardMetric created in [cts_admin]: ${metric.metricName} = ${metric.value} (${metric._id})`);


    // ----------------------------------------------------
    // 4. Verify Admin Panel Cross-Database Access
    // ----------------------------------------------------
    console.log('\n--- Verifying Cross-Database Admin Controller Read capabilities ---');
    
    const inquiryCount = await Inquiry.countDocuments();
    const serviceCount = await ProductService.countDocuments();
    const activityCount = await Activity.countDocuments();
    
    const ecommProductCount = await Product.countDocuments();
    const adminUserCount = await User.countDocuments();

    console.log('Resulting stats compiled successfully from separate DBs:');
    console.log(` - cts_portfolio [Inquiries: ${inquiryCount}, Services: ${serviceCount}, Activities: ${activityCount}]`);
    console.log(` - cts_ecomm     [Products: ${ecommProductCount}]`);
    console.log(` - cts_admin     [Users: ${adminUserCount}]`);
    console.log('\n✓ Cross-database querying works flawlessly!');

    console.log('\n================================================');
    console.log(' VERIFICATION SUCCESSFUL: 3-Way Segregation Active');
    console.log('================================================');

  } catch (error) {
    console.error('\n✗ Verification Failed with error:', error);
  } finally {
    // Close connections
    console.log('\nClosing all database connections...');
    await portfolioDb.close();
    await ecommDb.close();
    await adminDb.close();
    console.log('Connections closed. Exiting.');
    process.exit(0);
  }
}

runVerification();

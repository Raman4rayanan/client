const mongoose = require('mongoose');
const dns = require('dns');

// Configure Node.js to use Google and Cloudflare DNS servers for c-ares resolution.
// This bypasses local/ISP DNS routers that fail to resolve MongoDB Atlas SRV records.
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  console.log('DNS: Configured external DNS servers (8.8.8.8, 1.1.1.1) for c-ares SRV lookups.');
} catch (dnsErr) {
  console.warn('DNS: Failed to set custom DNS servers:', dnsErr.message);
}

// Force Node to prioritize IPv4 over IPv6 during DNS lookup
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const portfolioUri = process.env.MONGODB_PORTFOLIO_URI || 'mongodb://127.0.0.1:27017/cts_portfolio';
const ecommUri = process.env.MONGODB_ECOMM_URI || 'mongodb://127.0.0.1:27017/cts_ecomm';
const adminUri = process.env.MONGODB_ADMIN_URI || 'mongodb://127.0.0.1:27017/cts_admin';

// Create separate connections to isolate database interactions
const portfolioDb = mongoose.createConnection(portfolioUri);
const ecommDb = mongoose.createConnection(ecommUri);
const adminDb = mongoose.createConnection(adminUri);

portfolioDb.on('connected', () => {
  console.log('MongoDB: Connection established to [cts_portfolio]');
});
portfolioDb.on('error', (err) => {
  console.error('MongoDB: [cts_portfolio] connection error:', err.message);
});
portfolioDb.on('disconnected', () => {
  console.log('MongoDB: Connection disconnected from [cts_portfolio]');
});

ecommDb.on('connected', () => {
  console.log('MongoDB: Connection established to [cts_ecomm]');
});
ecommDb.on('error', (err) => {
  console.error('MongoDB: [cts_ecomm] connection error:', err.message);
});
ecommDb.on('disconnected', () => {
  console.log('MongoDB: Connection disconnected from [cts_ecomm]');
});

adminDb.on('connected', () => {
  console.log('MongoDB: Connection established to [cts_admin]');
});
adminDb.on('error', (err) => {
  console.error('MongoDB: [cts_admin] connection error:', err.message);
});
adminDb.on('disconnected', () => {
  console.log('MongoDB: Connection disconnected from [cts_admin]');
});

module.exports = {
  portfolioDb,
  ecommDb,
  adminDb
};

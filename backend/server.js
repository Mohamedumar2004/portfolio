require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const profileRoutes = require('./routes/profile');
const contactRoutes = require('./routes/contact');
const atsRoutes = require('./routes/ats');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev/production flexibility
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Mohamed Umar Portfolio Backend API',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ats-match', atsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mohamed Umar F Portfolio API Server',
    status: 'running',
    documentation: {
      health: 'GET /api/health',
      profile: 'GET /api/profile',
      contact: 'POST /api/contact',
      atsMatch: 'POST /api/ats-match/match',
      atsSamples: 'GET /api/ats-match/samples',
      chat: 'POST /api/chat'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server locally if not required as a serverless module
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🚀 Portfolio Backend running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });
}

module.exports = app;

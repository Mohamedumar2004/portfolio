const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');

let memoryMessages = [];

const LOCAL_MESSAGES_FILE = path.join(__dirname, '../data/messages.json');
const TMP_MESSAGES_FILE = path.join(os.tmpdir(), 'messages.json');
const PROFILE_FILE = path.join(__dirname, '../data/profile.json');

// Helper to load messages
function loadMessages() {
  try {
    if (fs.existsSync(TMP_MESSAGES_FILE)) {
      const data = fs.readFileSync(TMP_MESSAGES_FILE, 'utf8');
      const parsed = JSON.parse(data || '[]');
      if (parsed.length > 0) return parsed;
    }
    if (fs.existsSync(LOCAL_MESSAGES_FILE)) {
      const data = fs.readFileSync(LOCAL_MESSAGES_FILE, 'utf8');
      const parsed = JSON.parse(data || '[]');
      if (parsed.length > 0) return parsed;
    }
    return memoryMessages;
  } catch (err) {
    return memoryMessages;
  }
}

// Helper to save messages
function saveMessages(messages) {
  memoryMessages = messages;
  try {
    fs.writeFileSync(TMP_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (err) {}
  try {
    fs.writeFileSync(LOCAL_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (err) {}
  return true;
}

// Middleware to verify admin token
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.ADMIN_SECRET_TOKEN || 'portfolio_umar_admin_secure_token_2026';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  if (token !== expectedToken) {
    return res.status(403).json({ success: false, message: 'Forbidden: Invalid or expired admin token.' });
  }

  next();
}

// POST /api/admin/login
router.post('/login', (req, res) => {
  try {
    const { userId, password } = req.body;

    const validUserId = process.env.ADMIN_USER_ID || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'mohamed@umar2026';
    const secretToken = process.env.ADMIN_SECRET_TOKEN || 'portfolio_umar_admin_secure_token_2026';

    if (!userId || !password) {
      return res.status(400).json({ success: false, message: 'Both User ID and Password are required.' });
    }

    if (userId.trim() === validUserId && password.trim() === validPassword) {
      return res.json({
        success: true,
        message: 'Admin authentication successful! Welcome Mohamed Umar.',
        token: secretToken,
        user: {
          id: validUserId,
          name: 'Mohamed Umar F',
          role: 'Administrator',
          loginAt: new Date().toISOString()
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid User ID or Password. Please check your credentials.'
      });
    }
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// GET /api/admin/stats
router.get('/stats', requireAdminAuth, (req, res) => {
  try {
    const messages = loadMessages();
    const unread = messages.filter(m => m.status === 'unread').length;
    const replied = messages.filter(m => m.status === 'replied').length;

    let profile = {};
    if (fs.existsSync(PROFILE_FILE)) {
      profile = JSON.parse(fs.readFileSync(PROFILE_FILE, 'utf8') || '{}');
    }

    res.json({
      success: true,
      data: {
        totalMessages: messages.length,
        unreadMessages: unread,
        repliedMessages: replied,
        totalProjects: profile.projects ? profile.projects.length : 0,
        totalCertifications: profile.certifications ? profile.certifications.length : 0,
        serverUptimeSeconds: Math.floor(process.uptime()),
        serverStartedAt: new Date(Date.now() - process.uptime() * 1000).toISOString()
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats.' });
  }
});

// GET /api/admin/messages
router.get('/messages', requireAdminAuth, (req, res) => {
  try {
    const messages = loadMessages();
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load messages.' });
  }
});

// PATCH /api/admin/messages/:id/status
router.patch('/messages/:id/status', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['read', 'unread', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const messages = loadMessages();
    const msgIndex = messages.findIndex(m => m.id === id);

    if (msgIndex === -1) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    messages[msgIndex].status = status;
    messages[msgIndex].updatedAt = new Date().toISOString();
    saveMessages(messages);

    res.json({
      success: true,
      message: `Message status updated to ${status}.`,
      data: messages[msgIndex]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update message status.' });
  }
});

// DELETE /api/admin/messages/:id
router.delete('/messages/:id', requireAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const messages = loadMessages();
    const filtered = messages.filter(m => m.id !== id);

    if (filtered.length === messages.length) {
      return res.status(404).json({ success: false, message: 'Message not found.' });
    }

    saveMessages(filtered);
    res.json({
      success: true,
      message: 'Message successfully deleted.'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
});

// PUT /api/admin/profile (Live edit profile data)
router.put('/profile', requireAdminAuth, (req, res) => {
  try {
    const updatedProfile = req.body;
    if (!updatedProfile || !updatedProfile.name) {
      return res.status(400).json({ success: false, message: 'Invalid profile payload.' });
    }

    try {
      fs.writeFileSync(PROFILE_FILE, JSON.stringify(updatedProfile, null, 2), 'utf8');
    } catch (e) {}

    res.json({
      success: true,
      message: 'Portfolio profile updated successfully!',
      data: updatedProfile
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save updated profile.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.join(__dirname, '../data/messages.json');

// Helper to load messages
function loadMessages() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      fs.writeFileSync(MESSAGES_FILE, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading messages file:', err);
    return [];
  }
}

// Helper to save messages
function saveMessages(messages) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing messages file:', err);
    return false;
  }
}

// POST /api/contact
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Your name is required.' });
    }
    if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }
    if (!message || !message.trim() || message.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Please provide a message with at least 5 characters.' });
    }

    const newMessage = {
      id: 'msg_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject && subject.trim()) || 'Portfolio Contact Inquiry',
      message: message.trim(),
      receivedAt: new Date().toISOString(),
      status: 'unread'
    };

    const messages = loadMessages();
    messages.unshift(newMessage);
    saveMessages(messages);

    console.log(`[Contact Form] New message received from ${newMessage.name} <${newMessage.email}>`);

    res.status(201).json({
      success: true,
      message: `Thank you, ${newMessage.name}! Your message has been sent successfully to Mohamed Umar.`,
      data: {
        id: newMessage.id,
        receivedAt: newMessage.receivedAt
      }
    });
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({ success: false, message: 'Server error processing your message. Please try again later.' });
  }
});

// GET /api/contact/messages (for verification/admin)
router.get('/messages', (req, res) => {
  const messages = loadMessages();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
});

module.exports = router;

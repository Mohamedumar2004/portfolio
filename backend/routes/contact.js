const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const os = require('os');

// Fallback memory store + dual file store (/tmp for serverless, ../data for local)
let memoryMessages = [];

const LOCAL_MESSAGES_FILE = path.join(__dirname, '../data/messages.json');
const TMP_MESSAGES_FILE = path.join(os.tmpdir(), 'messages.json');

// Helper to load messages
function loadMessages() {
  try {
    // Try tmp first (serverless)
    if (fs.existsSync(TMP_MESSAGES_FILE)) {
      const data = fs.readFileSync(TMP_MESSAGES_FILE, 'utf8');
      const parsed = JSON.parse(data || '[]');
      if (parsed.length > 0) return parsed;
    }

    // Try local file
    if (fs.existsSync(LOCAL_MESSAGES_FILE)) {
      const data = fs.readFileSync(LOCAL_MESSAGES_FILE, 'utf8');
      const parsed = JSON.parse(data || '[]');
      if (parsed.length > 0) return parsed;
    }

    return memoryMessages;
  } catch (err) {
    console.warn('Fallback to memory messages:', err.message);
    return memoryMessages;
  }
}

// Helper to save messages
function saveMessages(messages) {
  memoryMessages = messages;

  // Try saving to /tmp (always writable on Vercel/AWS Lambda)
  try {
    fs.writeFileSync(TMP_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (err) {
    // ignore
  }

  // Try saving to local file
  try {
    fs.writeFileSync(LOCAL_MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
  } catch (err) {
    // read-only in serverless, memory fallback is preserved
  }

  return true;
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
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a message.' });
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
      data: newMessage
    });
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({ success: false, message: 'Server error processing your message. Please try again later.' });
  }
});

// GET /api/contact/messages
router.get('/messages', (req, res) => {
  const messages = loadMessages();
  res.json({
    success: true,
    count: messages.length,
    data: messages
  });
});

module.exports = router;

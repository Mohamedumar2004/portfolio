const express = require('express');
const router = express.Router();
const profileData = require('../data/profile.json');

// GET /api/profile
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: profileData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// GET /api/profile/skills
router.get('/skills', (req, res) => {
  res.json({
    success: true,
    data: profileData.skills
  });
});

// GET /api/profile/projects
router.get('/projects', (req, res) => {
  res.json({
    success: true,
    data: profileData.projects
  });
});

// GET /api/profile/resume
router.get('/resume', (req, res) => {
  res.json({
    success: true,
    data: {
      name: profileData.name,
      title: profileData.title,
      email: profileData.email,
      phone: profileData.phone,
      linkedin: profileData.linkedin,
      summary: profileData.summary,
      education: profileData.education,
      skills: profileData.skills,
      projects: profileData.projects,
      certifications: profileData.certifications,
      workshops: profileData.workshops,
      experience: profileData.experience
    }
  });
});

module.exports = router;

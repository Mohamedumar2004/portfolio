const express = require('express');
const router = express.Router();
const profileData = require('../data/profile.json');

// Comprehensive candidate keyword bank extracted from Mohamed Umar's resume
const CANDIDATE_KEYWORDS = [
  // Programming & Core
  { key: 'java', label: 'Java', category: 'Programming' },
  { key: 'python', label: 'Python', category: 'Programming' },
  { key: 'sql', label: 'SQL', category: 'Programming' },
  { key: 'javascript', label: 'JavaScript / JS', category: 'Programming' },
  { key: 'oop', label: 'Object-Oriented Programming (OOP)', category: 'Core CS' },
  { key: 'data structures', label: 'Data Structures & Algorithms', category: 'Core CS' },

  // Mobile & Web
  { key: 'flutter', label: 'Flutter', category: 'Mobile & Frontend' },
  { key: 'dart', label: 'Dart', category: 'Mobile & Frontend' },
  { key: 'html', label: 'HTML5', category: 'Web Frontend' },
  { key: 'css', label: 'CSS3', category: 'Web Frontend' },
  { key: 'react', label: 'React.js', category: 'Web Frontend' },
  { key: 'rest', label: 'REST APIs', category: 'Backend & APIs' },
  { key: 'api', label: 'API Integration', category: 'Backend & APIs' },
  { key: 'provider', label: 'Provider State Management', category: 'Mobile Architecture' },
  { key: 'syncfusion', label: 'Syncfusion PDF & UI', category: 'Libraries' },

  // Cloud, AI & Data
  { key: 'aws', label: 'AWS Cloud', category: 'Cloud Architecture' },
  { key: 'cloud', label: 'Cloud Computing / Architecting', category: 'Cloud Architecture' },
  { key: 'data engineering', label: 'AWS Data Engineering', category: 'Data & Cloud' },
  { key: 'groq', label: 'Groq API / LLM', category: 'AI & Machine Learning' },
  { key: 'ai', label: 'Artificial Intelligence (AI)', category: 'AI & Machine Learning' },
  { key: 'ml', label: 'Machine Learning (ML)', category: 'AI & Machine Learning' },
  { key: 'ats', label: 'ATS Score & Resume Parsing', category: 'AI & NLP' },
  { key: 'data analysis', label: 'Data Analysis & Reporting', category: 'Data & Analytics' },
  { key: 'power bi', label: 'Power BI', category: 'Business Intelligence' },
  { key: 'excel', label: 'Advanced Excel', category: 'Data & Analytics' },

  // Databases & Tooling
  { key: 'mysql', label: 'MySQL', category: 'Databases' },
  { key: 'firebase', label: 'Firebase Authentication & DB', category: 'Databases & Auth' },
  { key: 'supabase', label: 'Supabase PostgreSQL', category: 'Databases & Backend' },
  { key: 'git', label: 'Git & Version Control', category: 'Dev Tools' },
  { key: 'github', label: 'GitHub', category: 'Dev Tools' },
  { key: 'vs code', label: 'Visual Studio Code', category: 'IDE' },
  { key: 'android studio', label: 'Android Studio', category: 'Mobile Dev Tools' }
];

// POST /api/ats-match
router.post('/match', (req, res) => {
  try {
    const { jobTitle = '', jobDescription = '' } = req.body;

    if (!jobDescription || jobDescription.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a job description or requirement text (at least 10 characters).'
      });
    }

    const combinedText = `${jobTitle} ${jobDescription}`.toLowerCase();
    
    // Evaluate matched and missing keywords
    const matchedKeywords = [];
    const missingKeywords = [];

    CANDIDATE_KEYWORDS.forEach(kw => {
      const regex = new RegExp(`\\b${kw.key}\\b`, 'i');
      if (regex.test(combinedText)) {
        matchedKeywords.push(kw);
      }
    });

    // Detect common industry keywords mentioned in job description that candidate could highlight
    const commonIndustryKeywords = [
      { key: 'docker', label: 'Docker / Containers' },
      { key: 'kubernetes', label: 'Kubernetes' },
      { key: 'node', label: 'Node.js' },
      { key: 'express', label: 'Express.js' },
      { key: 'typescript', label: 'TypeScript' },
      { key: 'ci/cd', label: 'CI/CD Pipelines' },
      { key: 'agile', label: 'Agile / Scrum' },
      { key: 'microservices', label: 'Microservices' },
      { key: 'nosql', label: 'MongoDB / NoSQL' },
      { key: 'unit test', label: 'Unit Testing / TDD' }
    ];

    commonIndustryKeywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw.key}\\b`, 'i');
      if (regex.test(combinedText)) {
        // If not already in matched keywords
        const isMatched = matchedKeywords.some(m => m.key === kw.key);
        if (!isMatched) {
          missingKeywords.push(kw);
        }
      }
    });

    // Calculate score
    const totalJobKeywordsFound = matchedKeywords.length + missingKeywords.length;
    let score = 75; // Baseline high fit for software developer general roles

    if (totalJobKeywordsFound > 0) {
      const matchRatio = matchedKeywords.length / totalJobKeywordsFound;
      score = Math.round(55 + (matchRatio * 42)); // Scale between 55% and 97%
    } else {
      // If user input is generic text, match against general developer criteria
      score = 88;
    }

    // Ensure score bounds
    score = Math.min(Math.max(score, 62), 98);

    // Strengths summary
    const strengths = [];
    if (matchedKeywords.some(k => ['flutter', 'dart', 'react'].includes(k.key))) {
      strengths.push('Excellent Cross-Platform & UI Development Foundation (Flutter/Dart)');
    }
    if (matchedKeywords.some(k => ['java', 'python', 'sql'].includes(k.key))) {
      strengths.push('Strong Core Programming Fundamentals (Java, Python, SQL)');
    }
    if (matchedKeywords.some(k => ['aws', 'cloud', 'data engineering'].includes(k.key))) {
      strengths.push('AWS Academy Certified Cloud Architecture & Data Pipelines');
    }
    if (matchedKeywords.some(k => ['groq', 'ai', 'ml', 'ats'].includes(k.key))) {
      strengths.push('Proven AI/LLM Integration & ATS Scoring Engineering (Smart Apply India)');
    }
    if (matchedKeywords.some(k => ['firebase', 'supabase', 'mysql'].includes(k.key))) {
      strengths.push('Modern Cloud Database & Auth Architectures (Supabase, Firebase, MySQL)');
    }

    if (strengths.length === 0) {
      strengths.push('Strong Computer Science & Business Systems foundation with 7.4 CGPA');
      strengths.push('Proven adaptability with full-stack, mobile, and AI tooling');
    }

    res.json({
      success: true,
      data: {
        score,
        verdict: score >= 85 ? 'Strong Match' : score >= 70 ? 'High Compatibility' : 'Moderate Fit',
        matchedCount: matchedKeywords.length,
        matchedKeywords: matchedKeywords.map(k => k.label),
        missingKeywords: missingKeywords.map(k => k.label),
        strengths,
        algorithmDetails: {
          engine: 'Smart Apply India ATS Compatibility Engine (Groq & Provider Architecture)',
          candidate: 'Mohamed Umar F (B.Tech CSBS)',
          analysisTimestamp: new Date().toISOString()
        }
      }
    });

  } catch (err) {
    console.error('Error in ATS matcher:', err);
    res.status(500).json({ success: false, message: 'Error analyzing ATS compatibility' });
  }
});

// GET /api/ats-match/samples (pre-populated role templates for quick testing)
router.get('/samples', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'fullstack-dev',
        title: 'Full Stack / Software Developer',
        description: 'Looking for a Software Developer with experience in Java, Python, SQL, REST APIs, HTML/CSS, React, and Git. Experience with cloud platforms (AWS) and modern databases like MySQL or Supabase is preferred.'
      },
      {
        id: 'flutter-dev',
        title: 'Flutter Mobile App Engineer',
        description: 'Seeking a Flutter Developer proficient in Dart, Provider state management, Firebase authentication, Supabase backend integration, REST APIs, and building intuitive cross-platform applications.'
      },
      {
        id: 'ai-cloud-eng',
        title: 'AI Integration & Cloud Developer',
        description: 'Hiring a developer with knowledge of AWS Cloud Architecting, Data Engineering, Groq API / LLM workflows, Python data analysis, and building intelligent automated application workflows.'
      }
    ]
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const profileData = require('../data/profile.json');

// Knowledge base processor for portfolio chat assistant
function generateAssistantReply(query) {
  const q = query.toLowerCase().trim();

  // Contact / Email / Phone inquiries
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('call') || q.includes('linkedin')) {
    return {
      reply: `You can reach **Mohamed Umar F** directly via:\n- 📧 **Email:** [${profileData.email}](mailto:${profileData.email})\n- 📞 **Phone:** ${profileData.phone}\n- 💼 **LinkedIn:** ${profileData.linkedin}\n- 📍 **Location:** ${profileData.location}\n\nYou can also submit a direct message in the Contact section on this page!`,
      suggestions: ['Tell me about your projects', 'What is Smart Apply India?', 'What are your core skills?']
    };
  }

  // Smart Apply India / Projects
  if (q.includes('project') || q.includes('smart apply') || q.includes('ats') || q.includes('flutter app') || q.includes('work')) {
    return {
      reply: `Mohamed's flagship project is **Smart Apply India - AI-Powered Job Application Assistant** 🚀\n\n**Key Highlights:**\n- **Tech Stack:** Flutter, Supabase, Firebase Auth, Provider Architecture, Groq API, Syncfusion PDF.\n- **Features:** Automated ATS score analysis, resume parsing, keyword extraction, and compatibility scoring algorithms.\n- **Architecture:** Provider-based reactive state management with high-throughput Groq API LLM integration.\n\nHe has also built enterprise data analysis systems (Sunteck) and AWS Cloud architectures! Check out the interactive ATS Matcher widget in the Projects section.`,
      suggestions: ['What skills do you have?', 'Where did you study?', 'Tell me about your certifications']
    };
  }

  // Skills / Programming / Languages / Tech
  if (q.includes('skill') || q.includes('java') || q.includes('python') || q.includes('flutter') || q.includes('sql') || q.includes('tech stack') || q.includes('database')) {
    return {
      reply: `Mohamed Umar possesses a versatile full-stack and cloud skill set:\n\n- **Languages:** Java, Python, SQL, JavaScript\n- **Mobile & Web:** Flutter (Expert), HTML5, CSS3, React, REST APIs, Provider, Syncfusion PDF\n- **Cloud & AI:** AWS Cloud Architecting, AWS Data Engineering, Groq API, Google AI-ML\n- **Databases & Tools:** MySQL, Supabase, Firebase, Git/GitHub, Android Studio, VS Code, Power BI, Excel`,
      suggestions: ['Tell me about your certifications', 'What is your education background?', 'How to hire Mohamed?']
    };
  }

  // Education / College / Degree / School
  if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('school') || q.includes('nehru')) {
    return {
      reply: `Mohamed Umar's academic background:\n\n- 🎓 **B.Tech in Computer Science and Business Systems (CSBS)**\n  *Nehru Institute of Engineering and Technology, Coimbatore* | **CGPA: 7.4** (2022 - 2026)\n- 🏫 **Higher Secondary School (12th)**\n  *Best Matriculation Higher Secondary School, Sirkali* | **59%** (2022)\n- 🏫 **SSLC (10th)**\n  *St. Joseph Matriculation Higher Secondary School, Sirkali* | **81%** (2020)`,
      suggestions: ['What certifications do you have?', 'Tell me about your internship', 'What are your best projects?']
    };
  }

  // Certifications / Workshops / AWS / Google
  if (q.includes('certif') || q.includes('aws') || q.includes('workshop') || q.includes('google') || q.includes('course')) {
    return {
      reply: `Mohamed holds the following recognized credentials:\n\n- ☁️ **AWS Academy Cloud Architecting** (EduSkills)\n- 📊 **AWS Academy Data Engineering** (EduSkills)\n- 🐍 **Python Programming Training** (EduSkills)\n- 🤖 **Google AI-ML Workshop** (Nehru Institute of Engineering and Technology, May 2024)`,
      suggestions: ['Tell me about Smart Apply India', 'What are your technical skills?', 'How can I contact Mohamed?']
    };
  }

  // Internship / Sunteck / Experience
  if (q.includes('intern') || q.includes('experience') || q.includes('sunteck') || q.includes('job') || q.includes('career')) {
    return {
      reply: `Mohamed completed an impactful internship as a **Data Analysis Intern** at **Sunteck, Kumbakonam** (January 20, 2025 - February 8, 2025).\n\nDuring this tenure, he conducted comprehensive data analytics, created operational reporting pipelines, and synthesized actionable business intelligence utilizing Python, SQL, Power BI, and Excel.`,
      suggestions: ['What is your B.Tech specialization?', 'Tell me about your Flutter apps', 'Download Resume']
    };
  }

  // Default intelligent greeting & guidance
  return {
    reply: `Hello! I am **Mohamed Umar's AI Portfolio Assistant** ⚡\n\nI can assist you with details about Mohamed's:\n- 🚀 **Projects** (like the Smart Apply India ATS assistant)\n- 💻 **Technical Skills** (Java, Flutter, Python, SQL, AWS, Groq API)\n- 🎓 **Education & CGPA** (B.Tech CSBS @ Nehru Institute of Eng & Tech)\n- 📜 **Certifications** (AWS Cloud Architecting, AWS Data Engineering)\n- 📬 **Contact Information** & hiring availability\n\nWhat would you like to know?`,
    suggestions: ['Tell me about your projects', 'What are your technical skills?', 'How can I contact Mohamed?']
  };
}

// POST /api/chat
router.post('/', (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a message.' });
    }

    const response = generateAssistantReply(message);
    res.json({
      success: true,
      data: response
    });
  } catch (err) {
    console.error('Error handling AI chat:', err);
    res.status(500).json({ success: false, message: 'Error processing chat query.' });
  }
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight,
  Code2, 
  Award,
  Layers
} from 'lucide-react';

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ROLES = [
  'Software Developer',
  'Full-Stack Engineer',
  'Flutter Mobile Specialist',
  'AI Integration Builder',
  'AWS Cloud Architect'
];

export default function Hero({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTypingSpeed(1800); // Pause on complete word
          setIsDeleting(true);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(45);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  const handleDownloadResume = () => {
    // Generate downloadable formatted resume or trigger print/save
    window.open('/mohamed-umar.jpg', '_blank');
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Bio & Intro */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="status-dot"></span>
              <span>Open to Software Developer Roles</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="hero-gradient-text">Mohamed Umar F</span>
            </h1>

            <div className="hero-role-wrapper">
              <span>I am a</span>
              <span style={{ color: 'var(--accent-cyan)' }}>{displayedText}</span>
              <span className="typing-cursor"></span>
            </div>

            <p className="hero-description">
              {profile?.summary || 
                "Aspiring Software Developer with expertise in full-stack application development, AI integration, and cloud technologies. Seeking a challenging Software Developer position to leverage technical skills in Java, Flutter, and cloud platforms."}
            </p>

            {/* Quick Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: '#c7d2fe'
              }}>
                <Code2 size={14} />
                <span>B.Tech CSBS (CGPA: 7.4)</span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: '#a5f3fc'
              }}>
                <Award size={14} />
                <span>AWS Cloud & Data Certified</span>
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.8rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '6px',
                fontSize: '0.82rem',
                color: '#6ee7b7'
              }}>
                <Sparkles size={14} />
                <span>Smart Apply India Creator</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                <Send size={18} />
                <span>Get In Touch</span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span>View Projects</span>
                <ArrowRight size={18} />
              </a>
              <a 
                href="#ats-demo" 
                className="btn btn-cyan"
              >
                <Sparkles size={18} />
                <span>Test ATS Matcher</span>
              </a>
            </div>

            {/* Social & Direct Contact Links */}
            <div className="hero-socials">
              <a 
                href="https://www.linkedin.com/in/mohamed-umar-f" 
                target="_blank" 
                rel="noreferrer" 
                className="social-icon-btn" 
                title="LinkedIn Profile"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a 
                href="mailto:mhamedumaru@gmail.com" 
                className="social-icon-btn" 
                title="Email: mhamedumaru@gmail.com"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:+919384738230" 
                className="social-icon-btn" 
                title="Call: +91 9384738230"
                aria-label="Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: User Image Frame with Glow */}
          <div className="hero-visual-wrapper">
            <div className="photo-glow-backdrop"></div>
            <div className="hero-photo-card">
              <img 
                src="/mohamed-umar.jpg" 
                alt="Mohamed Umar F" 
                className="hero-photo-img"
              />
              <div className="photo-badge-card">
                <div className="badge-icon-box">
                  <Code2 size={20} />
                </div>
                <div>
                  <div className="badge-text-title">Mohamed Umar F</div>
                  <div className="badge-text-sub">Full-Stack & Cloud Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

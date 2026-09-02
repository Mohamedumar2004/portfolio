import React from 'react';
import { ArrowUp, Heart, Mail, Phone, Code, Lock } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer({ profile, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.35rem' }}>
              <Code size={22} style={{ color: 'var(--accent-indigo)' }} />
              <span>Mohamed Umar F</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Software Developer • B.Tech CSBS • Flutter & Cloud Architect
            </p>
          </div>

          {/* Social Quick Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onOpenAdmin}
              className="social-icon-btn"
              title="Admin Portal"
              style={{ cursor: 'pointer', color: 'var(--accent-cyan)' }}
              aria-label="Admin Portal"
            >
              <Lock size={16} />
            </button>
            <a 
              href="mailto:mhamedumaru@gmail.com" 
              className="social-icon-btn"
              title="Email"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="tel:+919384738230" 
              className="social-icon-btn"
              title="Call"
              aria-label="Phone"
            >
              <Phone size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohamed-umar-f" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <button 
              onClick={scrollToTop}
              className="social-icon-btn"
              title="Back to Top"
              style={{ cursor: 'pointer' }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} Mohamed Umar F. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-highlight)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                textDecoration: 'underline'
              }}
            >
              Admin Login
            </button>
            <span>•</span>
            <span>Full-Stack Environment Configured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

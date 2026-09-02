import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Sparkles, Send, ShieldCheck, Lock } from 'lucide-react';

export default function Navbar({ profile, onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'skills', 'projects', 'ats-demo', 'timeline', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'ATS Matcher', href: '#ats-demo' },
    { label: 'Experience', href: '#timeline' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#hero" className="nav-brand">
          <img 
            src="/mohamed-umar.jpg" 
            alt="Mohamed Umar F" 
            className="brand-avatar" 
          />
          <span className="brand-name">Mohamed Umar F</span>
        </a>

        {/* Desktop Nav */}
        <nav>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button & Admin Access */}
        <div className="nav-actions">
          <button
            onClick={onOpenAdmin}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            title="Admin Portal (User ID & Password Protected)"
          >
            <Lock size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>Admin</span>
          </button>

          <a href="#contact" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
            <Send size={15} />
            <span>Hire Me</span>
          </a>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(13, 18, 31, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#f8fafc',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.5rem 0'
              }}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.25rem' }}
          >
            <Lock size={15} style={{ color: 'var(--accent-cyan)' }} />
            <span>Admin Portal</span>
          </button>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            <Send size={16} />
            <span>Get in Touch</span>
          </a>
        </div>
      )}
    </header>
  );
}

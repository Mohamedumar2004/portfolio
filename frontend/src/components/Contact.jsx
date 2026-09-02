import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  MessageSquare,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContactForm } from '../services/api';

const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in your name, email, and message.'
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await submitContactForm(formData);
      
      const newMsg = response.data || {
        id: 'msg_' + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: (formData.subject && formData.subject.trim()) || 'Portfolio Contact Inquiry',
        message: formData.message.trim(),
        receivedAt: new Date().toISOString(),
        status: 'unread'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('portfolio_submitted_messages') || '[]');
        existing.unshift(newMsg);
        localStorage.setItem('portfolio_submitted_messages', JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent('portfolio_new_message', { detail: newMsg }));
      } catch (e) {
        console.warn('Could not write to localStorage:', e);
      }

      setStatus({
        type: 'success',
        message: response.message || 'Your message has been sent successfully!'
      });

      // Trigger celebratory confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Unable to connect to backend server. You can email directly at mhamedumaru@gmail.com'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const email = profile?.email || 'mhamedumaru@gmail.com';
  const phone = profile?.phone || '+91 9384738230';
  const location = profile?.location || 'Tamil Nadu, India';
  const linkedin = profile?.linkedin || 'https://www.linkedin.com/in/mohamed-umar-f';

  return (
    <section id="contact" className="section" style={{ background: 'rgba(13, 18, 31, 0.6)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>Connect With Me</span>
          </div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in collaborating, hiring for a software developer role, or discussing a project? Send a message directly or connect via phone/email.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Contacts */}
          <div className="contact-info-cards">
            <a href={`mailto:${email}`} className="info-card">
              <div className="info-icon-box">
                <Mail size={22} />
              </div>
              <div>
                <div className="info-label">Direct Email</div>
                <div className="info-val">{email}</div>
              </div>
            </a>

            <a href={`tel:${phone}`} className="info-card">
              <div className="info-icon-box">
                <Phone size={22} />
              </div>
              <div>
                <div className="info-label">Phone / Mobile</div>
                <div className="info-val">{phone}</div>
              </div>
            </a>

            <a href={linkedin} target="_blank" rel="noreferrer" className="info-card">
              <div className="info-icon-box">
                <LinkedinIcon size={22} />
              </div>
              <div>
                <div className="info-label">LinkedIn Profile</div>
                <div className="info-val">Mohamed Umar F</div>
              </div>
            </a>

            <div className="info-card">
              <div className="info-icon-box">
                <MapPin size={22} />
              </div>
              <div>
                <div className="info-label">Location</div>
                <div className="info-val">{location}</div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem', marginTop: '0.5rem', background: 'rgba(99, 102, 241, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c7d2fe', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <Clock size={16} />
                <span>Quick Response Commitment</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                I actively monitor email and messages. You can expect a response within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="glass-card contact-form">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <MessageSquare size={22} style={{ color: 'var(--accent-indigo)' }} />
              <span>Send a Direct Message</span>
            </h3>

            {status.type && (
              <div style={{
                padding: '0.85rem 1.1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem',
                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: status.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(244, 63, 94, 0.4)',
                color: status.type === 'success' ? '#6ee7b7' : '#fda4af'
              }}>
                {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@example.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Job Opportunity / Collaboration / Project Inquiry"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="form-textarea"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {submitting ? (
                  <span>Sending Message to Backend...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message to Mohamed Umar</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

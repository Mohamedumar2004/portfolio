import React from 'react';
import { Award, Cloud, Database, Code, Brain, Calendar, CheckCircle } from 'lucide-react';

export default function Certifications({ profile }) {
  const certs = profile?.certifications || [
    {
      title: "AWS Academy Cloud Architecting",
      issuer: "AWS Academy (EduSkills)",
      badge: "AWS Certified",
      icon: "Cloud",
      description: "Mastery in designing resilient, highly scalable, and cost-effective cloud architectures on AWS."
    },
    {
      title: "AWS Academy Data Engineering",
      issuer: "AWS Academy (EduSkills)",
      badge: "AWS Data",
      icon: "Database",
      description: "Practical training in data pipelines, big data storage, transformation, and ingestion workflows."
    },
    {
      title: "Python Programming Training",
      issuer: "EduSkills",
      badge: "Python Certified",
      icon: "Code",
      description: "Advanced problem solving, OOP patterns, data structures, and script automation with Python."
    }
  ];

  const workshops = profile?.workshops || [
    {
      title: "Google AI-ML Workshop",
      institution: "Nehru Institute of Engineering and Technology",
      location: "Coimbatore, Tamil Nadu",
      date: "May 15 - 17, 2024",
      description: "3-day intensive hands-on workshop on machine learning models, neural networks, and Google AI tooling."
    }
  ];

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={14} />
            <span>Credentials & Accreditations</span>
          </div>
          <h2 className="section-title">Certifications & Workshops</h2>
          <p className="section-subtitle">
            Industry-standard certifications in Cloud Architecting, Data Engineering, Python, and Google AI/ML.
          </p>
        </div>

        {/* Certifications Cards */}
        <div className="cert-grid">
          {certs.map((cert, index) => (
            <div key={index} className="glass-card cert-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="cert-icon">
                  {cert.icon === 'Cloud' ? <Cloud size={24} /> : cert.icon === 'Database' ? <Database size={24} /> : <Code size={24} />}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: '#c7d2fe'
                }}>
                  {cert.badge}
                </span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">{cert.issuer}</div>
              <p className="cert-desc">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Workshops Banner */}
        <div style={{ marginTop: '2.5rem' }}>
          {workshops.map((ws, index) => (
            <div 
              key={index}
              className="glass-card" 
              style={{ 
                padding: '2rem',
                borderLeft: '4px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Brain size={26} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{ws.title}</h3>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--accent-emerald)',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      Completed
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <strong>{ws.institution}</strong> • {ws.location}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    {ws.description}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-highlight)',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)'
              }}>
                <Calendar size={15} />
                <span>{ws.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

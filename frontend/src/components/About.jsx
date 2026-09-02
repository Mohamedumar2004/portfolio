import React from 'react';
import { User, Award, BookOpen, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export default function About({ profile }) {
  const stats = profile?.about?.stats || [
    { label: 'B.Tech CSBS CGPA', value: '7.4 / 10' },
    { label: 'Featured Projects', value: '5+' },
    { label: 'Certifications', value: '3+' },
    { label: 'ATS Compatibility', value: '95%' }
  ];

  const pillars = [
    {
      title: 'Full-Stack & Mobile Development',
      description: 'Building robust, cross-platform apps using Flutter, React, HTML5, CSS3, Java, and REST APIs with clean Provider state architectures.'
    },
    {
      title: 'AI & LLM Integration',
      description: 'Architecting intelligent workflows utilizing Groq API, resume parsing algorithms, keyword extraction, and compatibility scoring.'
    },
    {
      title: 'Cloud & Data Engineering',
      description: 'AWS Academy certified in Cloud Architecting and Data Engineering. Proficient with MySQL, Supabase PostgreSQL, and Firebase.'
    },
    {
      title: 'Business Systems Alignment',
      description: 'Combining Computer Science with enterprise business workflows, data analytics, and reporting (Sunteck internship experience).'
    }
  ];

  return (
    <section id="about" className="section" style={{ background: 'rgba(13, 18, 31, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">Driven by Innovation & Engineering</h2>
          <p className="section-subtitle">
            Bridging software engineering, artificial intelligence, and cloud scalability to build impactful digital products.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Text */}
          <div className="about-text">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: '#f8fafc' }}>
              B.Tech in Computer Science & Business Systems
            </h3>
            
            <p>
              I am an aspiring Software Developer graduating from <strong>Nehru Institute of Engineering and Technology, Coimbatore</strong> with a CGPA of <strong>7.4</strong>.
            </p>

            <p>
              My expertise lies in full-stack application development, mobile engineering with <strong>Flutter</strong>, AI integration (utilizing <strong>Groq API</strong>), and cloud infrastructures (<strong>AWS</strong>, <strong>Supabase</strong>, and <strong>Firebase</strong>).
            </p>

            <p>
              I developed <strong>Smart Apply India</strong>, an AI-powered job application assistant with real-time resume parsing, keyword extraction, and ATS compatibility scoring algorithms. I also conducted data analytics and reporting during my internship at <strong>Sunteck</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginTop: '1.5rem' }}>
              {pillars.map((item, idx) => (
                <div 
                  key={idx} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-cyan)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#f1f5f9', fontSize: '0.92rem' }}>{item.title}: </strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Stats & Visual Overview */}
          <div className="about-stats-wrapper">
            <div className="about-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Academic Snapshot Card */}
            <div className="glass-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <BookOpen size={22} style={{ color: 'var(--accent-indigo)' }} />
                <h4 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>Academic Excellence</h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <strong>Degree:</strong> B.Tech - Computer Science and Business Systems
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                <strong>Institute:</strong> Nehru Institute of Engineering and Technology, Coimbatore
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <strong>Specialization:</strong> Full-Stack Development, Cloud Platforms, AI Integration, and Enterprise Business Systems
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

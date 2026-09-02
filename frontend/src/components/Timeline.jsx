import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Timeline({ profile }) {
  const experiences = profile?.experience || [
    {
      role: "Data Analysis Intern",
      company: "Sunteck",
      location: "Kumbakonam, Tamil Nadu",
      period: "January 20, 2025 - February 8, 2025",
      type: "Internship",
      description: "Conducted data analysis and reporting during internship period. Extracted key trends from multi-source datasets, created structured summaries for operational teams, and utilized advanced data tooling."
    }
  ];

  const education = profile?.education || [
    {
      degree: "B.Tech - Computer Science and Business Systems",
      institution: "Nehru Institute of Engineering and Technology",
      location: "Coimbatore, Tamil Nadu",
      score: "CGPA: 7.4",
      period: "2022 - 2026",
      highlights: "Comprehensive focus on software engineering, cloud computing, enterprise business systems, and AI/ML algorithms."
    },
    {
      degree: "Higher Secondary School - 2022",
      institution: "Best Matriculation Higher Secondary School",
      location: "Sirkali, Tamil Nadu",
      score: "Percentage: 59%",
      period: "Completed 2022",
      highlights: "Higher secondary education in Mathematics & Science."
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC) - 2020",
      institution: "St. Joseph Matriculation Higher Secondary School",
      location: "Sirkali, Tamil Nadu",
      score: "Percentage: 81%",
      period: "Completed 2020",
      highlights: "Secondary school certificate with distinction."
    }
  ];

  return (
    <section id="timeline" className="section" style={{ background: 'rgba(13, 18, 31, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>Journey & Track Record</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            A chronological timeline of my professional internship and academic milestones.
          </p>
        </div>

        <div className="timeline-wrapper">
          {/* Experience Items */}
          {experiences.map((exp, idx) => (
            <div key={`exp-${idx}`} className="timeline-item">
              <div className="timeline-dot" style={{ borderColor: 'var(--accent-indigo)', boxShadow: '0 0 10px var(--accent-indigo)' }}></div>
              <div className="glass-card timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="timeline-period" style={{ color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '9999px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#c7d2fe',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}>
                    {exp.type || 'Internship'}
                  </span>
                </div>

                <h3 className="timeline-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc' }}>
                  <Briefcase size={20} style={{ color: 'var(--accent-indigo)' }} />
                  {exp.role}
                </h3>

                <div className="timeline-org" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>{exp.company}</strong>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    {exp.location}
                  </span>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

          {/* Education Items */}
          {education.map((edu, idx) => (
            <div key={`edu-${idx}`} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span className="timeline-period" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={14} />
                    {edu.period}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(6, 182, 212, 0.3)'
                  }}>
                    {edu.score}
                  </span>
                </div>

                <h3 className="timeline-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc' }}>
                  <GraduationCap size={20} style={{ color: 'var(--accent-cyan)' }} />
                  {edu.degree}
                </h3>

                <div className="timeline-org" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>{edu.institution}</strong>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                    <MapPin size={13} />
                    {edu.location}
                  </span>
                </div>

                {edu.highlights && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {edu.highlights}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

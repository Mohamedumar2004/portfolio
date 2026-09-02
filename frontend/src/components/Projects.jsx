import React from 'react';
import { 
  FolderGit2, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Cpu, 
  Smartphone, 
  Database, 
  BarChart3,
  Layers,
  Zap,
  Bot
} from 'lucide-react';

export default function Projects({ profile }) {
  const projects = profile?.projects || [];

  return (
    <section id="projects" className="section" style={{ background: 'rgba(13, 18, 31, 0.5)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">Engineered Projects & Solutions</h2>
          <p className="section-subtitle">
            Highlighting real-world applications engineered with Flutter, AI/LLM integrations, cloud platforms, and data analytics.
          </p>
        </div>

        <div className="projects-container">
          {projects.map((project, index) => {
            const isFlagship = project.featured || project.id === 'smart-apply-india';

            return (
              <div 
                key={project.id || index} 
                className={`glass-card ${isFlagship ? 'project-card-featured' : ''}`}
                style={{ padding: '2.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="project-badge-featured">
                    <Sparkles size={14} />
                    <span>{project.badge || 'Project'}</span>
                  </div>

                  {isFlagship && (
                    <a 
                      href="#ats-demo"
                      className="btn btn-cyan" 
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Bot size={15} />
                      <span>Try Interactive ATS Matcher</span>
                    </a>
                  )}
                </div>

                <h3 className="project-title" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isFlagship ? <Smartphone size={28} style={{ color: 'var(--accent-cyan)' }} /> : <BarChart3 size={28} style={{ color: 'var(--accent-indigo)' }} />}
                  {project.title}
                </h3>

                <p className="project-desc">{project.description}</p>

                {/* Tech Stack Tags */}
                <div className="tech-tags">
                  {project.technologies?.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Architectural Highlights */}
                <div style={{ marginTop: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#e2e8f0', marginBottom: '0.75rem', fontWeight: 600 }}>
                    Key Architectural & Engineering Highlights:
                  </h4>
                  <ul className="project-highlights-list">
                    {project.highlights?.map((highlight, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle2 size={18} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

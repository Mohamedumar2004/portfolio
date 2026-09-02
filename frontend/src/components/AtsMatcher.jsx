import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bot, 
  CheckCircle, 
  AlertCircle, 
  Cpu, 
  RefreshCw, 
  Zap, 
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { checkAtsCompatibility, fetchAtsSamples } from '../services/api';

export default function AtsMatcher() {
  const [jobTitle, setJobTitle] = useState('Software Developer / Full Stack Engineer');
  const [jobDescription, setJobDescription] = useState(
    'Looking for a passionate Software Developer with hands-on skills in Java, Python, SQL, REST APIs, HTML/CSS, and Flutter. Cloud familiarity with AWS, MySQL/Supabase databases, and AI integration (Groq API) is a major plus.'
  );
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSamples() {
      const data = await fetchAtsSamples();
      if (data && data.length > 0) {
        setSamples(data);
      }
    }
    loadSamples();

    // Run initial demo match on page load
    handleRunMatch(
      'Software Developer / Full Stack Engineer',
      'Looking for a passionate Software Developer with hands-on skills in Java, Python, SQL, REST APIs, HTML/CSS, and Flutter. Cloud familiarity with AWS, MySQL/Supabase databases, and AI integration (Groq API) is a major plus.'
    );
  }, []);

  const handleSelectSample = (sample) => {
    setJobTitle(sample.title);
    setJobDescription(sample.description);
    handleRunMatch(sample.title, sample.description);
  };

  const handleRunMatch = async (titleToUse, descToUse) => {
    const title = titleToUse !== undefined ? titleToUse : jobTitle;
    const desc = descToUse !== undefined ? descToUse : jobDescription;

    if (!desc || desc.trim().length < 10) {
      setError('Please provide at least 10 characters of job requirements or description.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await checkAtsCompatibility(title, desc);
      setResults(data);

      if (data.score >= 85) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to ATS Matcher backend. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ats-demo" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag" style={{ background: 'rgba(6, 182, 212, 0.12)', borderColor: 'rgba(6, 182, 212, 0.3)', color: 'var(--accent-cyan)' }}>
            <Zap size={14} />
            <span>Interactive Project Demo</span>
          </div>
          <h2 className="section-title">Smart Apply India ATS Simulator</h2>
          <p className="section-subtitle">
            Experience Mohamed's live ATS scoring & keyword parsing algorithm. Test any job description against Mohamed Umar's verified resume in real time.
          </p>
        </div>

        <div className="glass-card ats-widget-card">
          <div className="ats-widget-header">
            <div className="ats-widget-title">
              <Bot size={24} />
              <span>AI Resume-to-Job Compatibility Engine</span>
            </div>

            {/* Quick Preset Roles */}
            <div className="sample-roles">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick Presets:</span>
              {samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className="sample-role-pill"
                >
                  {s.title.split('/')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Input Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Target Role / Job Title:
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Developer, Flutter Engineer, Full-Stack Developer"
                className="form-input"
                style={{ marginBottom: '0.5rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Job Description / Required Skills:
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste any job description, technical requirements, or skills list..."
                className="ats-input-textarea"
                rows={4}
              />
            </div>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: '#fda4af',
              fontSize: '0.88rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleRunMatch()}
              disabled={loading}
              className="btn btn-cyan"
              style={{ padding: '0.75rem 1.8rem' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Computing ATS Compatibility...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Run Live ATS Analysis</span>
                </>
              )}
            </button>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              ⚡ Powered by Express backend endpoint: <code>/api/ats-match/match</code>
            </span>
          </div>

          {/* Results Display */}
          {results && (
            <div className="ats-results-box">
              <div className="ats-score-display">
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Calculated ATS Match Score
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                    <div className="ats-score-number">{results.score}%</div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: results.score >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                      color: results.score >= 80 ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                      border: '1px solid currentColor'
                    }}>
                      {results.verdict}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Matched Keywords</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                    {results.matchedCount} Identified
                  </div>
                </div>
              </div>

              {/* Matched Keywords Tags */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
                  ✅ Matched Skills & Capabilities from Mohamed's Resume:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {results.matchedKeywords && results.matchedKeywords.length > 0 ? (
                    results.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          color: '#6ee7b7',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        ✓ {kw}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>General developer core profile matched</span>
                  )}
                </div>
              </div>

              {/* Strengths Breakdown */}
              {results.strengths && results.strengths.length > 0 && (
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.4rem' }}>
                    💡 Candidate Strengths & Alignment:
                  </span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {results.strengths.map((str, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

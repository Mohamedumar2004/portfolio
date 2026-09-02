import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Database, 
  Smartphone, 
  Layout, 
  Layers, 
  Server, 
  Cpu, 
  FileText, 
  Cloud, 
  CloudRain, 
  Sparkles, 
  Brain, 
  Zap, 
  Flame, 
  GitBranch, 
  Monitor, 
  BarChart3,
  Coffee,
  Check
} from 'lucide-react';

const ICON_MAP = {
  Coffee: Coffee,
  Terminal: Terminal,
  Database: Database,
  Code: Code2,
  Smartphone: Smartphone,
  Layout: Layout,
  Layers: Layers,
  Server: Server,
  Cpu: Cpu,
  FileText: FileText,
  Cloud: Cloud,
  CloudRain: CloudRain,
  Sparkles: Sparkles,
  Brain: Brain,
  Zap: Zap,
  Flame: Flame,
  GitBranch: GitBranch,
  Monitor: Monitor,
  BarChart3: BarChart3
};

export default function Skills({ profile }) {
  const [activeTab, setActiveTab] = useState('all');

  const skillsData = profile?.skills || {
    languages: [
      { name: "Java", level: 90, icon: "Coffee", category: "languages" },
      { name: "Python", level: 85, icon: "Terminal", category: "languages" },
      { name: "SQL", level: 85, icon: "Database", category: "languages" },
      { name: "JavaScript", level: 80, icon: "Code", category: "languages" }
    ],
    web_mobile: [
      { name: "Flutter", level: 92, icon: "Smartphone", category: "web_mobile" },
      { name: "HTML5 & CSS3", level: 90, icon: "Layout", category: "web_mobile" },
      { name: "React.js", level: 82, icon: "Layers", category: "web_mobile" },
      { name: "REST APIs", level: 88, icon: "Server", category: "web_mobile" },
      { name: "Provider Architecture", level: 85, icon: "Cpu", category: "web_mobile" },
      { name: "Syncfusion PDF", level: 80, icon: "FileText", category: "web_mobile" }
    ],
    cloud_ai: [
      { name: "AWS Cloud Architecting", level: 85, icon: "Cloud", category: "cloud_ai" },
      { name: "AWS Data Engineering", level: 80, icon: "CloudRain", category: "cloud_ai" },
      { name: "Groq API & LLM Workflows", level: 88, icon: "Sparkles", category: "cloud_ai" },
      { name: "Google AI-ML", level: 82, icon: "Brain", category: "cloud_ai" }
    ],
    databases_tools: [
      { name: "MySQL", level: 88, icon: "Database", category: "databases_tools" },
      { name: "Supabase", level: 85, icon: "Zap", category: "databases_tools" },
      { name: "Firebase Authentication & DB", level: 86, icon: "Flame", category: "databases_tools" },
      { name: "Git & GitHub", level: 88, icon: "GitBranch", category: "databases_tools" },
      { name: "VS Code & Android Studio", level: 90, icon: "Monitor", category: "databases_tools" },
      { name: "Power BI & Excel", level: 82, icon: "BarChart3", category: "databases_tools" }
    ]
  };

  const allSkillsList = [
    ...(skillsData.languages || []).map(s => ({ ...s, category: 'languages' })),
    ...(skillsData.web_mobile || []).map(s => ({ ...s, category: 'web_mobile' })),
    ...(skillsData.cloud_ai || []).map(s => ({ ...s, category: 'cloud_ai' })),
    ...(skillsData.databases_tools || []).map(s => ({ ...s, category: 'databases_tools' }))
  ];

  const filteredSkills = activeTab === 'all' 
    ? allSkillsList 
    : allSkillsList.filter(s => s.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Proficiencies' },
    { id: 'languages', label: 'Programming' },
    { id: 'web_mobile', label: 'Web & Flutter' },
    { id: 'cloud_ai', label: 'Cloud & AI' },
    { id: 'databases_tools', label: 'Databases & Tools' }
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Technical Expertise</span>
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive overview of my programming languages, frameworks, cloud certifications, and development tooling.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="skills-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`skill-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const IconComponent = ICON_MAP[skill.icon] || Code2;
            return (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <div className="skill-name-box">
                    <div className="skill-icon-wrap">
                      <IconComponent size={18} />
                    </div>
                    <span>{skill.name}</span>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

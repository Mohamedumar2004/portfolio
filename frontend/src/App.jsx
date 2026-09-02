import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AtsMatcher from './components/AtsMatcher';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import AdminPortal from './components/AdminPortal';
import { fetchProfile } from './services/api';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        console.warn('Could not fetch backend profile on initial load:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <div className="app-layout">
      {/* Navigation with Admin Trigger */}
      <Navbar 
        profile={profile} 
        onOpenAdmin={() => setAdminOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills profile={profile} />
        <Projects profile={profile} />
        <AtsMatcher />
        <Timeline profile={profile} />
        <Certifications profile={profile} />
        <Contact profile={profile} />
      </main>

      {/* Footer with Admin Access */}
      <Footer 
        profile={profile} 
        onOpenAdmin={() => setAdminOpen(true)} 
      />

      {/* Interactive AI Chat Assistant */}
      <ChatBot />

      {/* Admin Portal Modal & Dashboard */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        currentProfile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
}

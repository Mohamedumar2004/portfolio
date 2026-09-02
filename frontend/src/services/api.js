// Centralized API Service for Mohamed Umar's Portfolio
// Configured dynamically via import.meta.env.VITE_API_BASE_URL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

console.log('[API Service] Initialized with Base URL:', API_BASE_URL);

export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/profile`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API Service] Error fetching live profile from backend, using fallback:', error);
    return null;
  }
}

export async function submitContactForm(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit message');
    return data;
  } catch (error) {
    console.error('[API Service] Contact submission error:', error);
    throw error;
  }
}

export async function checkAtsCompatibility(jobTitle, jobDescription) {
  try {
    const res = await fetch(`${API_BASE_URL}/ats-match/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, jobDescription })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to compute ATS match');
    return data.data;
  } catch (error) {
    console.error('[API Service] ATS matcher error:', error);
    throw error;
  }
}

export async function fetchAtsSamples() {
  try {
    const res = await fetch(`${API_BASE_URL}/ats-match/samples`);
    if (!res.ok) throw new Error('Failed to load ATS sample templates');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('[API Service] Could not fetch ATS samples from backend, using local defaults:', error);
    return [
      {
        id: 'fullstack-dev',
        title: 'Full Stack / Software Developer',
        description: 'Looking for a Software Developer with experience in Java, Python, SQL, REST APIs, HTML/CSS, React, and Git. Experience with cloud platforms (AWS) and modern databases like MySQL or Supabase is preferred.'
      },
      {
        id: 'flutter-dev',
        title: 'Flutter Mobile App Engineer',
        description: 'Seeking a Flutter Developer proficient in Dart, Provider state management, Firebase authentication, Supabase backend integration, REST APIs, and building intuitive cross-platform applications.'
      },
      {
        id: 'ai-cloud-eng',
        title: 'AI Integration & Cloud Developer',
        description: 'Hiring a developer with knowledge of AWS Cloud Architecting, Data Engineering, Groq API / LLM workflows, Python data analysis, and building intelligent automated application workflows.'
      }
    ];
  }
}

export async function sendChatMessage(message) {
  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to communicate with AI chat');
    return data.data;
  } catch (error) {
    console.error('[API Service] Chatbot API error:', error);
    return {
      reply: "I am having temporary trouble contacting the backend server. Mohamed Umar is reachable directly at mhamedumaru@gmail.com or +91 9384738230!",
      suggestions: ['Check email', 'What is Smart Apply India?', 'What are Mohamed\'s skills?']
    };
  }
}

// ==========================================
// Admin API Functions
// ==========================================

export async function adminLogin(userId, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid admin credentials');
    return data;
  } catch (error) {
    console.error('[API Service] Admin login error:', error);
    throw error;
  }
}

export async function adminGetStats(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load stats');
    return data.data;
  } catch (error) {
    console.error('[API Service] Admin stats error:', error);
    throw error;
  }
}

export async function adminGetMessages(token) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/messages`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load messages');
    return data.data;
  } catch (error) {
    console.error('[API Service] Admin messages error:', error);
    throw error;
  }
}

export async function adminUpdateMessageStatus(id, status, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/messages/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update message status');
    return data.data;
  } catch (error) {
    console.error('[API Service] Admin update status error:', error);
    throw error;
  }
}

export async function adminDeleteMessage(id, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete message');
    return data;
  } catch (error) {
    console.error('[API Service] Admin delete message error:', error);
    throw error;
  }
}

export async function adminUpdateProfile(updatedProfile, token) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedProfile)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to save updated profile');
    return data.data;
  } catch (error) {
    console.error('[API Service] Admin update profile error:', error);
    throw error;
  }
}

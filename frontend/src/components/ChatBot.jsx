import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, RefreshCw, MessageSquare } from 'lucide-react';
import { sendChatMessage } from '../services/api';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "👋 Hi! I am **Mohamed Umar's AI Portfolio Assistant**.\n\nAsk me anything about Mohamed's projects (like **Smart Apply India**), technical skills, B.Tech education, or certifications!",
      suggestions: [
        'Tell me about Smart Apply India',
        'What are Mohamed\'s skills?',
        'Education & CGPA',
        'How can I contact Mohamed?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || loading) return;

    const userMessage = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await sendChatMessage(query);
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: response.reply,
          suggestions: response.suggestions || []
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: "I couldn't reach the backend server right now. Feel free to reach Mohamed directly at **mhamedumaru@gmail.com** or **+91 9384738230**!",
          suggestions: ['Tell me about his skills', 'What is his education?']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatText = (text) => {
    // Simple markdown formatting for bold and links
    const parts = text.split('\n').map((line, i) => {
      let formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #38bdf8; text-decoration: underline;">$1</a>');
      
      return (
        <span 
          key={i} 
          style={{ display: 'block', marginBottom: line ? '0.25rem' : '0.5rem' }}
          dangerouslySetInnerHTML={{ __html: formattedLine }} 
        />
      );
    });
    return parts;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className="chat-fab-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Ask Mohamed's Portfolio AI"
        aria-label="Open AI Chatbot"
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="chat-modal-window">
          {/* Header */}
          <div className="chat-window-header">
            <div className="chat-window-title">
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--grad-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Bot size={16} />
              </div>
              <div>
                <span style={{ color: '#ffffff' }}>Mohamed's AI Assistant</span>
                <div style={{ fontSize: '0.7rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                  <span>Online • REST API Connected</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-messages-body">
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={`chat-msg-bubble ${msg.sender === 'user' ? 'chat-msg-user' : 'chat-msg-assistant'}`}>
                  {formatText(msg.text)}
                </div>

                {/* Suggestions under assistant response */}
                {msg.suggestions && msg.suggestions.length > 0 && idx === messages.length - 1 && !loading && (
                  <div className="chat-suggestions-wrap" style={{ marginTop: '0.4rem' }}>
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSend(sug)}
                        className="chat-suggestion-chip"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-msg-bubble chat-msg-assistant" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <RefreshCw size={14} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chat-input-bar"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about skills, projects, ATS..."
              className="chat-input-field"
            />
            <button 
              type="submit" 
              disabled={loading || !inputText.trim()}
              className="chat-send-btn"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

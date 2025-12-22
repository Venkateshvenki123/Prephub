import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial welcome message
    setMessages([{ role: "bot", content: "Hello! 👋 I'm Guled's assistant. How can I help?" }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input.trim().toLowerCase();
    setInput('');
    setLoading(true);

    // Smart page redirects + responses
    setTimeout(() => {
      let response = "";
      let shouldRedirect = false;
      let redirectPath = "";

      // PAGE REDIRECTS
      if (userInput.includes('interview') || userInput.includes('prep') || userInput.includes('leetcode') || userInput.includes('dsa')) {
        response = "Perfect! Here's my Interview Prep → /interview-prep";
        shouldRedirect = true;
        redirectPath = "/interview-prep";
      } 
      else if (userInput.includes('notes') || userInput.includes('note')) {
        response = "My Notes Portal → /notes";
        shouldRedirect = true;
        redirectPath = "/notes";
      }
      else if (userInput.includes('job') || userInput.includes('application') || userInput.includes('internship')) {
        response = "Job & Internship Tracker → /jobs";
        shouldRedirect = true;
        redirectPath = "/jobs";
      }
      else if (userInput.includes('internship')) {
        response = "Internship Tracker → /internships";
        shouldRedirect = true;
        redirectPath = "/internships";
      }
      else if (userInput.includes('about') || userInput.includes('experience')) {
        response = "About me & skills → /about";
        shouldRedirect = true;
        redirectPath = "/about";
      }
      
      // CUSTOM GREETINGS
      else if (userInput.includes('hi') || userInput.includes('hello') || userInput.includes('hey')) {
        response = "Hello! 😊 What can I help you with today? (interview prep, notes, jobs, React, DSA)";
      }
      
      // TECH RESPONSES
      else if (userInput.includes('react') || userInput.includes('hook')) {
        response = "React: useEffect (side effects), useCallback (memo functions), useMemo (expensive values). Want interview questions? Say 'React interview'";
      }
      else if (userInput.includes('leetcode') || userInput.includes('two sum')) {
        response = "LeetCode: Two Sum = hashmap O(n). Try /interview-prep for full DSA roadmap!";
      }
      
      // FALLBACK
      else {
        response = "Say 'interview prep', 'notes', 'jobs', 'internships', 'about', or ask about React/DSA! 😊";
      }

      setMessages(prev => [...prev, { role: "bot", content: response }]);
      setLoading(false);

      // Auto redirect after 2 seconds
      if (shouldRedirect) {
        setTimeout(() => {
          setIsOpen(false);
          navigate(redirectPath);
        }, 1500);
      }
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', width: '68px', height: '68px',
          borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          border: 'none', color: 'white', fontSize: '1.8rem', cursor: 'pointer',
          boxShadow: '0 12px 40px rgba(59,130,246,0.4)', zIndex: 10000
        }}
        title="AI Assistant"
      >
        💬
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed', bottom: '30px', right: '30px', width: '420px', height: '560px',
      maxWidth: '90vw', maxHeight: '90vh', background: 'rgba(15,23,42,0.98)',
      borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      border: '1px solid rgba(59,130,246,0.3)', display: 'flex', flexDirection: 'column',
      zIndex: 10000, fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)', padding: '1.5rem',
        color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <div style={{fontSize: '1.5rem'}}>🤖</div>
          <div style={{fontWeight: '700', fontSize: '1.15rem'}}>Guled Assistant</div>
        </div>
        <button onClick={() => setIsOpen(false)} style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: '1.75rem'
        }}>×</button>
      </div>
      
      <div style={{flex: 1, padding: '1.75rem', overflowY: 'auto', background: 'rgba(30,41,59,0.6)'}}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: '1.5rem', padding: '1.125rem 1.5rem', borderRadius: '22px',
            maxWidth: '85%', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(71,85,105,0.8)',
            color: msg.role === 'user' ? '#ffffff' : '#e2e8f0', fontSize: '0.98rem', lineHeight: '1.55'
          }}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '1.5rem'}}>
            <div style={{
              padding: '1.125rem 1.5rem', borderRadius: '22px', background: 'rgba(71,85,105,0.8)',
              color: '#94a3b8', fontStyle: 'italic', fontSize: '0.98rem'
            }}>
              Guled is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div style={{padding: '1.5rem', borderTop: '1px solid rgba(71,85,105,0.4)', background: 'rgba(15,23,42,0.95)'}}>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-end'}}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type 'interview prep', 'notes', 'jobs'... or ask about React/DSA"
            disabled={loading}
            style={{
              flex: 1, padding: '1rem 1.5rem', borderRadius: '25px', border: '1px solid rgba(71,85,105,0.6)',
              background: 'rgba(30,41,59,0.9)', color: '#f8fafc', fontSize: '1rem', outline: 'none',
              transition: 'all 0.3s ease'
            }}
            maxLength={500}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              padding: '1rem 1.75rem', borderRadius: '25px', border: 'none',
              background: (loading || !input.trim()) ? 'rgba(71,85,105,0.5)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white', fontWeight: '600', cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
              minWidth: '70px', transition: 'all 0.3s ease', fontSize: '1rem'
            }}
          >
            {loading ? '⏳' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

const Home = () => (
  <>
    {/* FLOATING ELEMENTS PATTERN */}
    <div className="floating-dots"></div>
    
    <div className="container">
      {/* HERO with Geometric Pattern */}
      <section className="hero" style={{position: 'relative'}}>
        <div style={{
          position: 'absolute', top: '10%', right: '5%', width: '120px', height: '120px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          borderRadius: '50%', animation: 'pulse 3s infinite'
        }}></div>
        <div style={{
          position: 'absolute', bottom: '20%', left: '8%', width: '80px', height: '80px',
          background: 'linear-gradient(45deg, rgba(96,165,250,0.25), rgba(147,197,253,0.25))',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animation: 'bounce 4s infinite'
        }}></div>
        
        <h1 style={{fontSize: 'clamp(3rem, 7vw, 5rem)', marginBottom: '1rem', zIndex: 2, position: 'relative'}}>
          Hi, I'm <span style={{color: '#3b82f6', fontWeight: '900'}}>Prephub</span>
        </h1>
        <p className="hero-subtitle" style={{fontSize: '1.35rem', zIndex: 2, position: 'relative'}}>
          Full-Stack Developer from <span style={{color: '#60a5fa'}}>India</span> | 
          156+ LeetCode | React Expert | SDE-1 Prep | 52+ Applications Tracked
        </p>
      
      <div className="hero-buttons" style={{marginTop: '2.5rem'}}>
        <a href="/interview-prep" className="btn btn-primary">🎯 Start Interview Prep</a>
        <a href="/jobs" className="btn btn-secondary">📊 Track Applications</a>
        <a href="/notes" className="btn btn-secondary">📝 Open Notes Portal</a>
      </div>
    </section>

    {/* STATS - IMMEDIATE */}
    <section className="stats-grid">
      <div className="card" style={{textAlign: 'center'}}>
        <div className="stat-number">156</div>
        <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>LeetCode Solved</div>
        <div style={{color: '#64748b', fontSize: '0.9rem'}}>NeetCode 150 + Blind 75</div>
      </div>
      <div className="card" style={{textAlign: 'center'}}>
        <div className="stat-number" style={{color: '#10b981'}}>52</div>
        <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>Applications</div>
        <div style={{color: '#64748b', fontSize: '0.9rem'}}>25 Jobs + 27 Internships</div>
      </div>
      <div className="card" style={{textAlign: 'center'}}>
        <div className="stat-number" style={{color: '#f59e0b'}}>18</div>
        <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>Projects Built</div>
        <div style={{color: '#64748b', fontSize: '0.9rem'}}>Production React Apps</div>
      </div>
      <div className="card" style={{textAlign: 'center'}}>
        <div className="stat-number" style={{color: '#ef4444'}}>₹32L</div>
        <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>Avg CTC Target</div>
        <div style={{color: '#64748b', fontSize: '0.9rem'}}>SDE-1 Roles</div>
      </div>
    </section>

    {/* SKILLS */}
    <section className="section-title" style={{margin: '3rem 0 2rem'}}>
      <h2>Tech Stack</h2>
      <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Technologies I work with daily</p>
    </section>

    <div className="card-grid">
      <div className="card">
        <h3 style={{color: '#3b82f6', fontSize: '1.75rem', marginBottom: '1.25rem'}}>
          🛠️ Frontend Mastery
        </h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem'}}>
          <span className="status-badge" style={{background: 'rgba(59,130,246,0.2)', color: '#60a5fa'}}>React</span>
          <span className="status-badge" style={{background: 'rgba(139,92,246,0.2)', color: '#a78bfa'}}>Next.js</span>
          <span className="status-badge" style={{background: 'rgba(16,185,129,0.2)', color: '#4ade80'}}>TypeScript</span>
          <span className="status-badge" style={{background: 'rgba(245,158,11,0.2)', color: '#fbbf24'}}>Tailwind</span>
        </div>
      </div>

      <div className="card">
        <h3 style={{color: '#10b981', fontSize: '1.75rem', marginBottom: '1.25rem'}}>
          🔧 Backend & Tools
        </h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem'}}>
          <span className="status-badge" style={{background: 'rgba(239,68,68,0.2)', color: '#f87171'}}>Node.js</span>
          <span className="status-badge" style={{background: 'rgba(59,130,246,0.2)', color: '#60a5fa'}}>Express</span>
          <span className="status-badge" style={{background: 'rgba(16,185,129,0.2)', color: '#4ade80'}}>MongoDB</span>
          <span className="status-badge" style={{background: 'rgba(245,158,11,0.2)', color: '#fbbf24'}}>Git</span>
        </div>
      </div>

      <div className="card">
        <h3 style={{color: '#f59e0b', fontSize: '1.75rem', marginBottom: '1.25rem'}}>
          🎯 Currently Learning
        </h3>
        <ul style={{color: '#94a3b8', paddingLeft: '1.5rem', marginTop: '1rem'}}>
          <li>System Design Fundamentals</li>
          <li>React Query / SWR</li>
          <li>GraphQL Basics</li>
          <li>Advanced DSA Patterns</li>
        </ul>
      </div>
    </div>

    {/* FEATURED PROJECTS */}
    <section className="section-title" style={{margin: '4rem 0 2.5rem'}}>
      <h2>Featured Projects</h2>
      <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Real-world applications I've built</p>
    </section>

    <div className="card-grid">
      <div className="card">
        <h3 style={{color: '#3b82f6', marginBottom: '1rem'}}>🎯 Interview Prep Dashboard</h3>
        <p style={{marginBottom: '1.25rem'}}>
          Comprehensive DSA tracker with topic-wise progress, mock interviews, 
          and company-specific question banks.
        </p>
        <div style={{color: '#94a3b8', fontSize: '0.95rem'}}>
          React • Context API • Custom Hooks • Responsive Design
        </div>
      </div>

      <div className="card">
        <h3 style={{color: '#10b981', marginBottom: '1rem'}}>📊 Job & Internship Tracker</h3>
        <p style={{marginBottom: '1.25rem'}}>
          Advanced application tracker with CTC analysis, rejection patterns, 
          and interview scheduling.
        </p>
        <div style={{color: '#94a3b8', fontSize: '0.95rem'}}>
          React • Charts.js • localStorage • Notifications
        </div>
      </div>

      <div className="card">
        <h3 style={{color: '#f59e0b', marginBottom: '1rem'}}>📝 Ultimate Notes Hub</h3>
        <p style={{marginBottom: '1.25rem'}}>
          Smart notes app with syntax highlighting, tags, search, 
          dark/light mode, and export features.
        </p>
        <div style={{color: '#94a3b8', fontSize: '0.95rem'}}>
          React • Tailwind • Search • Themes
        </div>
      </div>
    </div>

    {/* TIMELINE */}
    <section className="section-title" style={{margin: '4rem 0 3rem'}}>
      <h2>My Journey</h2>
      <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>From beginner to SDE-1 ready</p>
    </section>

    <div style={{maxWidth: '900px', margin: '0 auto 4rem'}}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '3rem', padding: '0 2rem'}}>
        <div style={{width: '20px', height: '20px', background: '#ef4444', borderRadius: '50%', marginRight: '1.5rem', boxShadow: '0 0 0 4px rgba(239,68,68,0.2)'}}></div>
        <div>
          <h3 style={{color: '#ef4444', fontSize: '1.5rem', marginBottom: '0.5rem'}}>2023: Foundations</h3>
          <p>HTML/CSS/JS → First React project → 50 LeetCode problems → Basic DSA</p>
        </div>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '3rem', padding: '0 2rem'}}>
        <div style={{width: '20px', height: '20px', background: '#f59e0b', borderRadius: '50%', marginRight: '1.5rem', boxShadow: '0 0 0 4px rgba(245,158,11,0.2)'}}></div>
        <div>
          <h3 style={{color: '#f59e0b', fontSize: '1.5rem', marginBottom: '0.5rem'}}>2024: Full-Stack</h3>
          <p>Node.js APIs → MERN stack → 100+ LeetCode → First internship → Portfolio</p>
        </div>
      </div>
      
      <div style={{display: 'flex', alignItems: 'center', padding: '0 2rem'}}>
        <div style={{width: '20px', height: '20px', background: '#10b981', borderRadius: '50%', marginRight: '1.5rem', boxShadow: '0 0 0 4px rgba(16,185,129,0.2)'}}></div>
        <div>
          <h3 style={{color: '#10b981', fontSize: '1.5rem', marginBottom: '0.5rem'}}>2025: SDE-1 Ready</h3>
          <p>System Design → Mock Interviews → 50+ Job Apps → Advanced React → This Portfolio</p>
        </div>
      </div>
    </div>

    {/* CTA */}
    <section style={{textAlign: 'center', padding: '4rem 2rem', background: 'rgba(30,41,59,0.5)', borderRadius: '24px', border: '1px solid rgba(71,85,105,0.4)', margin: '4rem 0'}}>
      <h2 style={{fontSize: '2.75rem', marginBottom: '1.5rem', color: '#60a5fa'}}>
        Ready for SDE-1 Roles
      </h2>
      <p style={{fontSize: '1.3rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem'}}>
        Explore my interview preparation, track my job applications, 
        and browse 200+ quick notes from my journey.
      </p>
      <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap'}}>
        <a href="/interview-prep" className="btn btn-primary" style={{padding: '1.25rem 3rem', fontSize: '1.1rem'}}>
          🚀 Explore Interview Prep
        </a>
        <a href="/jobs" className="btn btn-secondary" style={{padding: '1.25rem 3rem', fontSize: '1.1rem'}}>
          📈 View Job Applications
        </a>
      </div>
    </section>
    </div>
  </>
);





































































































































































export default Home;

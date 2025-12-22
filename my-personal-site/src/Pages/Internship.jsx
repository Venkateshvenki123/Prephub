const Internship = () => {
  const stages = {
    applied: [
      { company: 'Flipkart', role: 'React Developer', applied: 'Nov 14', color: '#f56565' },
      { company: 'Paytm', role: 'Frontend Intern', applied: 'Nov 16', color: '#f59e0b' },
    ],
    assessment: [
      { company: 'Google', role: 'Software Engineer Intern', applied: 'Nov 15', color: '#4285f4' },
      { company: 'Amazon', role: 'SDE Intern', applied: 'Nov 8', color: '#ff9900' },
    ],
    interview: [
      { company: 'Microsoft', role: 'Frontend Intern', applied: 'Nov 10', color: '#00c6f8' },
      { company: 'StartupX', role: 'Backend Intern', applied: 'Nov 9', color: '#10b981' },
    ],
    rejected: [
      { company: 'Zomato', role: 'Fullstack Intern', applied: 'Nov 12', color: '#ef4444' },
    ],
    offers: []
  };

  return (
    <div className="container" style={{paddingTop: '6rem'}}>
      {/* HEADER */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem'}}>
        <div>
          <h1 style={{fontSize: '3rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Internship Pipeline
          </h1>
          <p style={{color: '#94a3b8', fontSize: '1.2rem'}}>Drag & drop applications across stages • 52 total tracked</p>
        </div>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <button className="btn" style={{padding: '1rem 2rem'}}>
            ➕ New Application
          </button>
          <button className="btn" style={{background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '2px solid #10b981'}}>
            📊
            <span style={{marginLeft: '0.5rem'}}>View Stats</span>
          </button>
        </div>
      </div>

      {/* STATS HEADER */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem'}}>
        <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
          <div style={{fontSize: '2.5rem', color: '#3b82f6'}}>52</div>
          <div style={{color: '#94a3b8'}}>Total</div>
        </div>
        <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
          <div style={{fontSize: '2.5rem', color: '#f59e0b'}}>12</div>
          <div style={{color: '#94a3b8'}}>Applied</div>
        </div>
        <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
          <div style={{fontSize: '2.5rem', color: '#10b981'}}>5</div>
          <div style={{color: '#94a3b8'}}>In Progress</div>
        </div>
        <div className="card" style={{textAlign: 'center', padding: '1.5rem'}}>
          <div style={{fontSize: '2.5rem', color: '#ef4444'}}>3</div>
          <div style={{color: '#94a3b8'}}>Closed</div>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div style={{display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '2rem'}}>
        {Object.entries(stages).map(([stageKey, applications]) => {
          const stageConfig = {
            applied: { title: '📤 Applied', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
            assessment: { title: '🔍 Assessment', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            interview: { title: '💬 Interviews', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            rejected: { title: '❌ Closed', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
            offers: { title: '🎉 Offers', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' }
          }[stageKey];

          return (
            <div key={stageKey} style={{minWidth: '320px', flexShrink: 0}}>
              <div className="card" style={{padding: '1.5rem', marginBottom: '1.5rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                  <h3 style={{fontSize: '1.2rem', color: stageConfig.color, margin: 0, fontWeight: '700'}}>
                    {stageConfig.title}
                  </h3>
                  <span style={{background: stageConfig.bg, color: stageConfig.color, padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600'}}>
                    {applications.length}
                  </span>
                </div>
              </div>

              <div className="card" style={{padding: '1rem', minHeight: '400px'}}>
                {applications.map((app, index) => (
                  <div key={index} className="card" style={{
                    marginBottom: '1rem', padding: '1.25rem', cursor: 'grab',
                    border: '2px solid transparent', position: 'relative',
                    background: app.color + '20'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = app.color + '40'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        background: app.color, color: 'white', fontWeight: '700',
                        fontSize: '0.85rem', display: 'flex', alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {app.company[0]}
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: '600', fontSize: '0.95rem'}}>{app.company}</div>
                        <div style={{color: '#94a3b8', fontSize: '0.85rem'}}>{app.role}</div>
                      </div>
                    </div>
                    <div style={{color: '#94a3b8', fontSize: '0.8rem'}}>
                      Applied: {app.applied}
                    </div>
                    <div style={{
                      position: 'absolute', top: '0.75rem', right: '0.75rem',
                      display: 'flex', gap: '0.25rem'
                    }}>
                      <button style={{
                        background: 'none', border: 'none', color: '#94a3b8',
                        fontSize: '1rem', cursor: 'pointer', padding: '0.25rem'
                      }}>⋮⋮</button>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && (
                  <div style={{textAlign: 'center', color: '#94a3b8', padding: '2rem'}}>
                    Drop applications here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="card" style={{padding: '2rem', textAlign: 'center', marginTop: '3rem'}}>
        <h3 style={{marginBottom: '1rem'}}>Quick Actions</h3>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <button className="btn" style={{padding: '0.875rem 2rem'}}>
            📋 Bulk Import CSV
          </button>
          <button className="btn" style={{padding: '0.875rem 2rem', background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', border: '2px solid #8b5cf6'}}>
            🎨 Customize View
          </button>
          <button className="btn" style={{padding: '0.875rem 2rem', background: 'rgba(245,158,11,0.2)', color: '#f59e0b', border: '2px solid #f59e0b'}}>
            📧 Email Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Internship;

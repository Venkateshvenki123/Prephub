const Jobs = () => {
  const jobApplications = [
    {
      id: 1, company: 'Google', role: 'Software Engineer (SDE-1)', location: 'Bangalore, KA', applied: 'Dec 1, 2025', status: 'Online Assessment', salary: '₹35-45 LPA', type: 'Full-time'
    },
    {
      id: 2, company: 'Microsoft', role: 'Frontend Developer', location: 'Hyderabad, TS', applied: 'Nov 28, 2025', status: 'Technical Interview', salary: '₹30-40 LPA', type: 'Full-time'
    },
    {
      id: 3, company: 'Amazon', role: 'SDE-1', location: 'Remote', applied: 'Dec 3, 2025', status: 'Applied', salary: '₹40-55 LPA', type: 'Full-time'
    },
    {
      id: 4, company: 'Flipkart', role: 'Fullstack Developer', location: 'Bangalore, KA', applied: 'Nov 30, 2025', status: 'Rejected', salary: '₹25-35 LPA', type: 'Full-time'
    },
    {
      id: 5, company: 'Zerodha', role: 'Backend Engineer', location: 'Bangalore, KA', applied: 'Dec 5, 2025', status: 'Coding Round', salary: '₹28-38 LPA', type: 'Full-time'
    }
  ];

  const statusColors = {
    'Applied': 'rgba(59,130,246,0.25)', 'Online Assessment': 'rgba(245,158,11,0.25)',
    'Coding Round': 'rgba(245,158,11,0.25)', 'Technical Interview': 'rgba(34,197,94,0.25)', 'Rejected': 'rgba(239,68,68,0.25)'
  };

  return (
    <div className="jobs-page-bg">
      <div className="container">
        <section className="hero" style={{textAlign: 'center', paddingBottom: '3rem'}}>
          <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Job Applications
          </h1>
          <p style={{fontSize: '1.4rem', color: '#94a3b8'}}>Tracking SDE-1 roles across FAANG, Product Companies & Fintech</p>
          <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem'}}>
            <button className="btn" style={{padding: '1.125rem 2.75rem'}}>➕ New Job Application</button>
            <button className="btn btn-secondary" style={{padding: '1.125rem 2.75rem'}}>📊 Analytics</button>
          </div>
        </section>

      <section className="stats-grid">
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number">25</div>
          <div style={{color: '#94a3b8', fontSize: '1.2rem'}}>Total Jobs Applied</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#10b981'}}>7</div>
          <div style={{color: '#94a3b8', fontSize: '1.2rem'}}>In Progress</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#ef4444'}}>4</div>
          <div style={{color: '#94a3b8', fontSize: '1.2rem'}}>Rejected</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#3b82f6'}}>₹32</div>
          <div style={{color: '#94a3b8', fontSize: '1.2rem'}}>Avg CTC (LPA)</div>
        </div>
      </section>

      {/* CARD LAYOUT - RECENT APPLICATIONS */}
      <section>
        <div className="card" style={{padding: '0'}}>
          <div style={{padding: '2.5rem 2.5rem 2rem', borderBottom: '1px solid rgba(71,85,105,0.3)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
              <div>
                <h3 style={{fontSize: '1.75rem', margin: 0}}>Recent Applications</h3>
                <p style={{color: '#94a3b8', fontSize: '1rem', margin: '0.5rem 0 0'}}>25 total jobs • 7 in progress • Avg CTC ₹32 LPA</p>
              </div>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <select style={{padding: '1rem 1.75rem', borderRadius: '12px', border: '1px solid rgba(71,85,105,0.5)', background: 'rgba(30,41,59,0.5)', color: '#f8fafc'}}>
                  <option>All Jobs</option>
                  <option>In Progress</option>
                  <option>Offers</option>
                  <option>Rejected</option>
                </select>
                <button className="btn btn-secondary" style={{padding: '1rem 1.75rem'}}>Filter</button>
              </div>
            </div>
          </div>

          <div style={{padding: '0 2.5rem 2.5rem'}}>
            <div className="card-grid" style={{margin: 0}}>
              {jobApplications.map((job) => (
                <div className="card" key={job.id} style={{padding: '2.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '1.25rem'}}>
                      <div style={{
                        width: '64px', height: '64px', borderRadius: '16px',
                        background: statusColors[job.status], display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontWeight: '800',
                        fontSize: '1.25rem', color: 'white', boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                      }}>
                        {job.company[0]}
                      </div>
                      <div>
                        <h4 style={{fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.25rem', color: '#60a5fa'}}>
                          {job.company}
                        </h4>
                        <div style={{color: '#94a3b8', fontSize: '1rem'}}>{job.role}</div>
                      </div>
                    </div>
                    <span className="status-badge" style={{background: statusColors[job.status], padding: '0.75rem 1.5rem', fontSize: '0.95rem'}}>
                      {job.status}
                    </span>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
                    <div>
                      <div style={{color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.25rem'}}>Location</div>
                      <div style={{fontWeight: '600'}}>{job.location}</div>
                    </div>
                    <div>
                      <div style={{color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.25rem'}}>Applied</div>
                      <div style={{fontWeight: '600'}}>{job.applied}</div>
                    </div>
                    <div>
                      <div style={{color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.25rem'}}>CTC</div>
                      <div style={{fontWeight: '800', fontSize: '1.25rem', color: '#10b981'}}>{job.salary}</div>
                    </div>
                    <div>
                      <div style={{color: '#94a3b8', fontSize: '0.95rem', marginBottom: '0.25rem'}}>Type</div>
                      <div style={{fontWeight: '600', color: '#4ade80'}}>{job.type}</div>
                    </div>
                  </div>

                  <div style={{display: 'flex', gap: '1rem', justifyContent: 'flex-end'}}>
                    <button className="btn btn-secondary" style={{padding: '0.875rem 2rem'}}>🔄 Update Status</button>
                    <button className="btn" style={{padding: '0.875rem 2rem', background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '2px solid rgba(239,68,68,0.4)'}}>🗑️ Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{padding: '2.5rem', textAlign: 'center', borderTop: '1px solid rgba(71,85,105,0.3)', background: 'rgba(30,41,59,0.5)'}}>
              <span style={{color: '#94a3b8', marginRight: '2rem', fontSize: '1.1rem'}}>Showing 1-5 of 25 applications</span>
              <button className="btn btn-secondary" style={{padding: '1.125rem 3rem', fontSize: '1.1rem'}}>Load More Applications</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{marginTop: '4rem'}}>
        <div className="card" style={{padding: '2.5rem'}}>
          <h3 style={{marginBottom: '2rem', fontSize: '1.5rem'}}>Quick Filters</h3>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
            <button className="btn btn-secondary" style={{padding: '1rem 2rem'}}>All Jobs (25)</button>
            <button className="btn btn-secondary" style={{padding: '1rem 2rem'}}>In Progress (7)</button>
            <button className="btn btn-secondary" style={{padding: '1rem 2rem'}}>Rejected (4)</button>
            <button className="btn btn-secondary" style={{padding: '1rem 2rem'}}>Bangalore (12)</button>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Jobs;

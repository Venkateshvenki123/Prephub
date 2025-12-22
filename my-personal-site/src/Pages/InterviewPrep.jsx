const InterviewPrep = () => {
  const topics = [
    {
      category: "DSA",
      items: [
        { title: "Arrays & Hashing", problems: "Contains Duplicate, Valid Anagram, Two Sum", level: "Easy", progress: 100 },
        { title: "Two Pointers", problems: "Valid Palindrome, Container With Most Water", level: "Medium", progress: 85 },
        { title: "Sliding Window", problems: "Longest Substring Without Repeat", level: "Medium", progress: 70 },
        { title: "Stack", problems: "Valid Parentheses, Min Stack", level: "Easy", progress: 90 },
        { title: "Binary Search", problems: "Binary Search, Search Rotated Array", level: "Medium", progress: 60 },
        { title: "Linked List", problems: "Reverse Linked List, Merge Two Lists", level: "Easy", progress: 80 },
        { title: "Trees", problems: "Max Depth, Invert Binary Tree", level: "Easy", progress: 50 },
        { title: "DP", problems: "Climbing Stairs, Fibonacci", level: "Medium", progress: 30 }
      ]
    },
    {
      category: "React",
      items: [
        { title: "Core Concepts", problems: "Components, Props, State", level: "Easy", progress: 100 },
        { title: "Hooks", problems: "useState, useEffect, useContext", level: "Medium", progress: 95 },
        { title: "Performance", problems: "useCallback, useMemo, React.memo", level: "Medium", progress: 85 },
        { title: "Advanced", problems: "Custom Hooks, Portals, Error Boundaries", level: "Hard", progress: 70 },
        { title: "React 18", problems: "Concurrent Features, Automatic Batching", level: "Medium", progress: 60 }
      ]
    },
    {
      category: "JavaScript",
      items: [
        { title: "Closures & Scope", problems: "Closure Interview Qs", level: "Medium", progress: 90 },
        { title: "Event Loop", problems: "Async/Await vs Promises", level: "Medium", progress: 95 },
        { title: "this Keyword", problems: "Call, Apply, Bind", level: "Easy", progress: 100 },
        { title: "Prototypes", problems: "Inheritance Patterns", level: "Medium", progress: 75 },
        { title: "Array Methods", problems: "map, filter, reduce", level: "Easy", progress: 100 }
      ]
    },
    {
      category: "System Design",
      items: [
        { title: "URL Shortener", problems: "TinyURL Design", level: "Easy", progress: 80 },
        { title: "Chat Application", problems: "WhatsApp Design", level: "Medium", progress: 60 },
        { title: "News Feed", problems: "Twitter Feed", level: "Hard", progress: 40 },
        { title: "Rate Limiter", problems: "API Rate Limiting", level: "Medium", progress: 70 }
      ]
    }
  ];

  const companies = [
    { name: "Google", questions: "Arrays, Trees, DP", oa: "3 MCQ + 2 Coding", interviews: "2 Technical + 1 System" },
    { name: "Microsoft", questions: "Two Pointers, Graphs", oa: "2 Coding", interviews: "1 Technical + 1 Behavioral" },
    { name: "Amazon", questions: "Sliding Window, Heaps", oa: "4 Coding", interviews: "3 Technical + LP Round" }
  ];

  return (
    <div className="container">
      {/* HEADER */}
      <section className="hero" style={{textAlign: 'center', paddingBottom: '2.5rem'}}>
        <h1 style={{fontSize: '3.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Interview Preparation
        </h1>
        <p style={{fontSize: '1.4rem', color: '#94a3b8'}}>
          DSA • React • JavaScript • System Design for SDE-1 roles (156/300 problems solved)
        </p>
        <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem'}}>
          <a href="https://leetcode.com" target="_blank" className="btn btn-primary" rel="noreferrer">🚀 LeetCode Practice</a>
          <button className="btn btn-secondary">📋 Mock Interview</button>
          <button className="btn btn-secondary">📈 Progress Tracker</button>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number">156</div>
          <div style={{color: '#94a3b8'}}>Problems Solved</div>
          <div style={{color: '#64748b', fontSize: '0.9rem'}}>52% Complete</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#10b981'}}>8</div>
          <div style={{color: '#94a3b8'}}>Mock Interviews</div>
          <div style={{color: '#64748b', fontSize: '0.9rem'}}>4.2/5 Avg Score</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#f59e0b'}}>12</div>
          <div style={{color: '#94a3b8'}}>Topics Mastered</div>
          <div style={{color: '#64748b', fontSize: '0.9rem'}}>22/30 Topics</div>
        </div>
        <div className="card" style={{textAlign: 'center'}}>
          <div className="stat-number" style={{color: '#ef4444'}}>4</div>
          <div style={{color: '#94a3b8'}}>Company Patterns</div>
          <div style={{color: '#64748b', fontSize: '0.9rem'}}>Google, Microsoft, Amazon</div>
        </div>
      </section>

      {/* TOPICS */}
      <section>
        <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Topics Progress
        </h2>
        
        {topics.map((topicGroup) => (
          <div key={topicGroup.category} style={{marginBottom: '4rem'}}>
            <h3 style={{fontSize: '1.75rem', marginBottom: '2rem', color: '#60a5fa', paddingLeft: '1rem', borderLeft: '4px solid #3b82f6'}}>
              {topicGroup.category}
            </h3>
            <div className="card-grid">
              {topicGroup.items.map((topic, index) => (
                <div className="card" key={index}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                    <div>
                      <h4 style={{fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem'}}>
                        {topic.title}
                      </h4>
                      <div style={{color: '#94a3b8', fontSize: '0.95rem'}}>{topic.problems}</div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <div style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.25rem'}}>
                        {topic.level}
                      </div>
                      <div style={{fontSize: '3rem', fontWeight: '800', color: '#10b981'}}>
                        {topic.progress}%
                      </div>
                    </div>
                  </div>
                  <div style={{height: '8px', background: 'rgba(71,85,105,0.4)', borderRadius: '4px', overflow: 'hidden'}}>
                    <div style={{
                      height: '100%', width: `${topic.progress}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                      borderRadius: '4px', transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap'}}>
                    <a href="#" className="btn btn-secondary" style={{padding: '0.5rem 1.25rem', fontSize: '0.85rem'}}>Practice</a>
                    <a href="#" className="btn btn-secondary" style={{padding: '0.5rem 1.25rem', fontSize: '0.85rem'}}>Notes</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* COMPANY PREP */}
      <section style={{marginTop: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Company-wise Prep
        </h2>
        <div className="card-grid">
          {companies.map((company, index) => (
            <div className="card" key={index}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem'}}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px', background: '#3b82f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', color: 'white'
                }}>
                  {company.name[0]}
                </div>
                <div>
                  <h3 style={{fontSize: '1.75rem', margin: 0, color: '#60a5fa'}}>{company.name}</h3>
                  <div style={{color: '#94a3b8'}}>{company.questions}</div>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem'}}>
                <div>
                  <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>OA Format</div>
                  <div style={{fontWeight: '600'}}>{company.oa}</div>
                </div>
                <div>
                  <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>Interview Rounds</div>
                  <div style={{fontWeight: '600'}}>{company.interviews}</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{marginTop: '1.5rem', width: '100%', padding: '1rem'}}>
                Prepare for {company.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section style={{marginTop: '4rem', textAlign: 'center'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '2.5rem', color: '#60a5fa'}}>
          Quick Practice Links
        </h2>
        <div style={{display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '800px', margin: '0 auto'}}>
          <a href="https://leetcode.com/problemset/algorithms/" target="_blank" className="btn btn-primary" rel="noreferrer" style={{padding: '1.25rem 2.5rem'}}>
            LeetCode Top 100
          </a>
          <a href="https://neetcode.io/roadmap" target="_blank" className="btn btn-secondary" rel="noreferrer" style={{padding: '1.25rem 2.5rem'}}>
            NeetCode 150
          </a>
          <a href="#" className="btn btn-secondary" style={{padding: '1.25rem 2.5rem'}}>
            Blind 75
          </a>
        </div>
      </section>
    </div>
  );
};

export default InterviewPrep;

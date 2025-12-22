const About = () => {
  const skills = [
    { name: "React", level: 95, color: "#3b82f6" },
    { name: "JavaScript", level: 92, color: "#f59e0b" },
    { name: "TypeScript", level: 85, color: "#10b981" },
    { name: "Node.js", level: 80, color: "#ef4444" },
    { name: "Tailwind CSS", level: 90, color: "#8b5cf6" },
    { name: "MongoDB", level: 75, color: "#14b8a6" },
    { name: "Git/GitHub", level: 88, color: "#f97316" },
    { name: "System Design", level: 65, color: "#6366f1" }
  ];

  const experience = [
    {
      title: "Full-Stack Developer Intern",
      company: "TechStartupX",
      duration: "Jun 2024 - Dec 2024",
      description: "Built 5+ production React apps, implemented REST APIs, optimized performance by 40%. Led frontend team of 3.",
      achievements: ["Deployed 3 client projects", "Reduced load time by 2s", "Mentored 2 juniors"]
    },
    {
      title: "Frontend Developer (Freelance)",
      company: "3 Clients",
      duration: "Jan 2024 - May 2024",
      description: "Delivered responsive React dashboards and e-commerce sites. Integrated Stripe payments and authentication.",
      achievements: ["₹2.5L revenue generated", "100% client satisfaction", "Delivered 2 weeks early"]
    },
    {
      title: "Self-Taught Developer",
      company: "Personal Projects",
      duration: "Jan 2023 - Present",
      description: "Built portfolio, interview prep dashboard, job tracker. Solved 156+ LeetCode problems.",
      achievements: ["18 projects on GitHub", "NeetCode 150 completed", "Mock interviews (8/10)"]
    }
  ];

  return (
    <div className="container">
      {/* HERO */}
      <section className="hero" style={{textAlign: 'center', paddingBottom: '2rem'}}>
        <div style={{
          width: '140px', height: '140px', margin: '0 auto 2rem', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '4rem',
          boxShadow: '0 20px 40px rgba(59,130,246,0.3)'
        }}>
          👨‍💻
        </div>
        <h1 style={{fontSize: '3.5rem', marginBottom: '1rem'}}>
          About Guled
        </h1>
        <p style={{fontSize: '1.4rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 3rem'}}>
          Full-Stack Developer passionate about clean code, React performance, and cracking SDE-1 interviews.
          Currently targeting ₹30-45 LPA roles at product companies and FAANG.
        </p>
      </section>

      {/* SKILLS */}
      <section>
        <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '2.5rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Skills Mastery
        </h2>
        <div className="card-grid">
          {skills.map((skill, index) => (
            <div className="card" key={index}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', margin: 0}}>
                  {skill.name}
                </h3>
                <div style={{fontSize: '2rem', fontWeight: '800', color: skill.color}}>
                  {skill.level}%
                </div>
              </div>
              <div style={{height: '12px', background: 'rgba(71,85,105,0.4)', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  height: '100%', width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}cc)`,
                  borderRadius: '6px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{marginTop: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Experience
        </h2>
        <div className="card-grid">
          {experience.map((exp, index) => (
            <div className="card" key={index}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '1.5rem'}}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px', background: '#3b82f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: '800', color: 'white', flexShrink: 0
                }}>
                  {exp.company[0]}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <h3 style={{fontSize: '1.5rem', margin: 0, color: '#60a5fa'}}>
                      {exp.title}
                    </h3>
                    <div style={{fontSize: '0.95rem', color: '#94a3b8'}}>
                      {exp.duration}
                    </div>
                  </div>
                  <p style={{marginBottom: '1.5rem', color: '#e2e8f0'}}>
                    {exp.description}
                  </p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <div style={{width: '6px', height: '6px', background: '#10b981', borderRadius: '50%'}}></div>
                        <span style={{color: '#94a3b8'}}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS */}
      <section style={{marginTop: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Education & Certifications
        </h2>
        <div className="stats-grid">
          <div className="card" style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#3b82f6', marginBottom: '1rem'}}>B.Tech</div>
            <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>Computer Science</div>
            <div style={{color: '#64748b'}}>8.6 CGPA • 2022-2026</div>
          </div>
          <div className="card" style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#10b981', marginBottom: '1rem'}}>IBM</div>
            <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>Cloud & AI</div>
            <div style={{color: '#64748b'}}>Certified • 2024</div>
          </div>
          <div className="card" style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#f59e0b', marginBottom: '1rem'}}>156</div>
            <div style={{color: '#94a3b8', fontSize: '1.1rem'}}>LeetCode</div>
            <div style={{color: '#64748b'}}>Problems Solved</div>
          </div>
        </div>
      </section>

      {/* PERSONAL STATEMENT */}
      <section style={{marginTop: '4rem', textAlign: 'center', padding: '3rem 2rem'}}>
        <div className="card" style={{padding: '3.5rem 3rem'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1.5rem', color: '#60a5fa'}}>
            Why Hire Me?
          </h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto'}}>
            <div>
              <div style={{fontSize: '1.5rem', color: '#10b981', marginBottom: '0.75rem'}}>🎯 Interview Ready</div>
              <p style={{color: '#94a3b8'}}>156 LeetCode solved, 8 mock interviews (4.2/5), company-specific patterns mastered.</p>
            </div>
            <div>
              <div style={{fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.75rem'}}>🚀 Production Experience</div>
              <p style={{color: '#94a3b8'}}>5+ live React apps deployed, 40% performance optimization, led frontend team.</p>
            </div>
            <div>
              <div style={{fontSize: '1.5rem', color: '#f59e0b', marginBottom: '0.75rem'}}>💻 Full-Stack Capable</div>
              <p style={{color: '#94a3b8'}}>React + Node.js + MongoDB. REST APIs, authentication, deployment pipelines ready.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

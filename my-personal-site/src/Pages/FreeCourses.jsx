import { useState } from "react";
import { initialTracks } from "../data/freeCourses";
import CoursesTable from "../components/CoursesTable";

const FreeCourses = () => {
  const [tracks] = useState(initialTracks);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  return (
    <div className="container">
      <section className="hero" style={{ textAlign: "center", paddingBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "3.2rem",
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Free Courses Hub
        </h1>
        <p style={{ fontSize: "1.3rem", color: "#94a3b8", maxWidth: "700px", margin: "0 auto" }}>
          Curated 100% free courses for React, DSA, Computer Science, and interview preparation.
        </p>
      </section>

      <section className="stats-grid" style={{ marginBottom: "3rem" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div className="stat-number">4</div>
          <div style={{ color: "#94a3b8" }}>Learning Tracks</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div className="stat-number" style={{ color: "#3b82f6" }}>12+</div>
          <div style={{ color: "#94a3b8" }}>Free Courses</div>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <div className="stat-number" style={{ color: "#10b981" }}>₹0</div>
          <div style={{ color: "#94a3b8" }}>Total Cost</div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          onClick={() => setViewMode('cards')}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: viewMode === 'cards' ? '#3b82f6' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          Card View
        </button>
        <button
          onClick={() => setViewMode('table')}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: viewMode === 'table' ? '#3b82f6' : '#475569',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          Table View
        </button>
      </section>

      {viewMode === 'cards' ? (
        // Card View
        <>
          {tracks.map((track, i) => (
            <section key={i} style={{ marginBottom: "3rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0.25rem",
                  }}
                >
                  {track.title}
                </h2>
                <div style={{ color: "#94a3b8" }}>{track.level}</div>
              </div>
              <div className="card-grid">
                {track.items.map((item, idx) => (
                  <div key={idx} className="card" style={{ padding: "2.25rem" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#60a5fa" }}>
                      {item.name}
                    </h3>
                    <p style={{ color: "#e2e8f0", marginBottom: "1.25rem" }}>{item.desc}</p>
                    <div style={{ marginBottom: "1rem" }}>
                      <span
                        style={{
                          color: item.free_certificate ? '#10b981' : '#94a3b8',
                          fontWeight: item.free_certificate ? 'bold' : 'normal',
                        }}
                      >
                        {item.cert_status}
                      </span>
                    </div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: "0.85rem 1.75rem", fontSize: "0.95rem" }}
                    >
                      Open course
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      ) : (
        // Table View
        <section style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{
                fontSize: "2rem",
                background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.25rem",
              }}
            >
              All Courses
            </h2>
          </div>
          <CoursesTable data={tracks.flatMap(track => track.items)} />
        </section>
      )}

      <section style={{ margin: "4rem 0 3rem" }}>
        <div
          className="card"
          style={{
            padding: "2.5rem",
            textAlign: "center",
            background: "rgba(30,41,59,0.85)",
          }}
        >
          <h2 style={{ fontSize: "2.1rem", marginBottom: "1rem", color: "#60a5fa" }}>
            How to use this page
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "650px", margin: "0 auto 1.5rem" }}>
            Pick one React track, one DSA track, and one CS/Backend track. Follow them consistently for 3–6 months while building your own projects.
          </p>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            This page only lists resources that are completely free to start with, so you never need to buy random influencer courses.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FreeCourses;

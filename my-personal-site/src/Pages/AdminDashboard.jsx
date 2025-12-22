import { useState } from "react";

const AdminDashboard = () => {
  const [authorized, setAuthorized] = useState(false);
  const [pin, setPin] = useState("");
  const [tab, setTab] = useState("courses");

  // DATA FOR ALL SECTIONS (frontend-only)
  const [courses, setCourses] = useState([
    {
      id: 1,
      track: "React & Frontend",
      name: "Scrimba - Learn React for Free",
      desc: "Interactive React course where you code inside the video player.",
      link: "https://scrimba.com/learn/learnreact",
    },
    {
      id: 2,
      track: "DSA & Problem Solving",
      name: "NeetCode 150",
      desc: "Structured list of essential LeetCode problems.",
      link: "https://neetcode.io/roadmap",
    },
  ]);

  const [interviewTopics, setInterviewTopics] = useState([
    { id: 1, title: "Two Pointers", category: "DSA", level: "Medium" },
    { id: 2, title: "useEffect", category: "React", level: "Medium" },
  ]);

  const [internships, setInternships] = useState([
    { id: 1, company: "StartupX", role: "Frontend Intern", status: "Applied" },
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, company: "Google", role: "SDE-1", status: "Online Assessment" },
  ]);

  const [notes, setNotes] = useState([
    { id: 1, title: "Two Pointers", category: "DSA" },
    { id: 2, title: "useCallback vs useMemo", category: "React" },
  ]);

  // FORMS
  const [courseForm, setCourseForm] = useState({
    id: null,
    track: "",
    name: "",
    desc: "",
    link: "",
  });
  const [interviewForm, setInterviewForm] = useState({
    id: null,
    title: "",
    category: "",
    level: "",
  });
  const [internshipForm, setInternshipForm] = useState({
    id: null,
    company: "",
    role: "",
    status: "",
  });
  const [jobForm, setJobForm] = useState({
    id: null,
    company: "",
    role: "",
    status: "",
  });
  const [noteForm, setNoteForm] = useState({
    id: null,
    title: "",
    category: "",
  });

  // AUTH GATE
  if (!authorized) {
    return (
      <div className="container">
        <section className="hero" style={{ textAlign: "center", paddingBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Access
          </h1>
          <p style={{ color: "#94a3b8" }}>Restricted area. Enter admin PIN.</p>
        </section>

        <div className="card" style={{ maxWidth: "420px", margin: "0 auto", padding: "2.5rem" }}>
          <input
            type="password"
            placeholder="Admin PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              width: "100%",
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              marginBottom: "1rem",
              border: "1px solid rgba(71,85,105,0.6)",
            }}
          />
          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "0.9rem 1.2rem" }}
            onClick={() => {
              if (pin === "1234admin") setAuthorized(true);
              else alert("Wrong PIN");
            }}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // HELPERS
  const isEditing = (form) => form.id !== null;

  // RENDER
  return (
    <div className="container">
      {/* HEADER */}
      <section className="hero" style={{ paddingBottom: "1.5rem" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Admin Dashboard
        </h1>
        <p style={{ color: "#94a3b8" }}>
          Manage Free Courses, Interview Prep, Internships, Jobs, and Notes (frontend-only demo).
        </p>
      </section>

      {/* TABS */}
      <div
        className="card"
        style={{
          padding: "0.5rem",
          borderRadius: "999px",
          marginBottom: "2rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {[
          { id: "courses", label: "Free Courses" },
          { id: "interview", label: "Interview Prep" },
          { id: "internships", label: "Internships" },
          { id: "jobs", label: "Jobs" },
          { id: "notes", label: "Notes" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "0.7rem 1rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                tab === t.id ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "transparent",
              color: tab === t.id ? "#fff" : "#94a3b8",
              fontWeight: 600,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* FREE COURSES */}
      {tab === "courses" && (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Free Courses</h2>
          <div className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              {isEditing(courseForm) ? "Edit Course" : "Add Course"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!courseForm.track || !courseForm.name || !courseForm.link) return;
                if (courseForm.id === null) {
                  setCourses((prev) => [
                    ...prev,
                    { ...courseForm, id: Date.now() },
                  ]);
                } else {
                  setCourses((prev) =>
                    prev.map((c) =>
                      c.id === courseForm.id ? { ...courseForm } : c
                    )
                  );
                }
                setCourseForm({ id: null, track: "", name: "", desc: "", link: "" });
              }}
              style={{ display: "grid", gap: "0.9rem", maxWidth: "700px" }}
            >
              <input
                placeholder="Track (React & Frontend / DSA / etc.)"
                value={courseForm.track}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, track: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Course name"
                value={courseForm.name}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, name: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <textarea
                placeholder="Short description"
                value={courseForm.desc}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, desc: e.target.value })
                }
                rows={3}
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Course URL (https://...)"
                value={courseForm.link}
                onChange={(e) =>
                  setCourseForm({ ...courseForm, link: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" type="submit">
                  {isEditing(courseForm) ? "Save" : "Add"}
                </button>
                {isEditing(courseForm) && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setCourseForm({
                        id: null,
                        track: "",
                        name: "",
                        desc: "",
                        link: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>All Courses</h3>
            <div className="card-grid">
              {courses.map((c) => (
                <div key={c.id} className="card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.3rem", color: "#60a5fa" }}>{c.name}</h4>
                  <div style={{ color: "#94a3b8", marginBottom: "0.4rem" }}>{c.track}</div>
                  <p style={{ color: "#e2e8f0", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                    {c.desc}
                  </p>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3b82f6", fontSize: "0.9rem" }}
                  >
                    {c.link}
                  </a>
                  <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCourseForm(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setCourses((prev) => prev.filter((x) => x.id !== c.id))
                      }
                      style={{
                        background: "rgba(239,68,68,0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.4)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <div style={{ color: "#64748b" }}>No courses yet.</div>
              )}
            </div>
          </div>
        </>
      )}

      {/* INTERVIEW PREP */}
      {tab === "interview" && (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Interview Prep</h2>
          <div className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              {isEditing(interviewForm) ? "Edit Topic" : "Add Topic"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!interviewForm.title) return;
                if (interviewForm.id === null) {
                  setInterviewTopics((prev) => [
                    ...prev,
                    { ...interviewForm, id: Date.now() },
                  ]);
                } else {
                  setInterviewTopics((prev) =>
                    prev.map((t) =>
                      t.id === interviewForm.id ? { ...interviewForm } : t
                    )
                  );
                }
                setInterviewForm({
                  id: null,
                  title: "",
                  category: "",
                  level: "",
                });
              }}
              style={{ display: "grid", gap: "0.9rem", maxWidth: "700px" }}
            >
              <input
                placeholder="Title (Two Pointers, useEffect...)"
                value={interviewForm.title}
                onChange={(e) =>
                  setInterviewForm({ ...interviewForm, title: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Category (DSA / React / JS / System Design)"
                value={interviewForm.category}
                onChange={(e) =>
                  setInterviewForm({
                    ...interviewForm,
                    category: e.target.value,
                  })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Level (Easy / Medium / Hard)"
                value={interviewForm.level}
                onChange={(e) =>
                  setInterviewForm({ ...interviewForm, level: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" type="submit">
                  {isEditing(interviewForm) ? "Save" : "Add"}
                </button>
                {isEditing(interviewForm) && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setInterviewForm({
                        id: null,
                        title: "",
                        category: "",
                        level: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Topics</h3>
            <div className="card-grid">
              {interviewTopics.map((t) => (
                <div key={t.id} className="card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.3rem", color: "#60a5fa" }}>{t.title}</h4>
                  <div style={{ color: "#94a3b8", marginBottom: "0.4rem" }}>
                    {t.category} • {t.level}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setInterviewForm(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setInterviewTopics((prev) =>
                          prev.filter((x) => x.id !== t.id)
                        )
                      }
                      style={{
                        background: "rgba(239,68,68,0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.4)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {interviewTopics.length === 0 && (
                <div style={{ color: "#64748b" }}>No topics yet.</div>
              )}
            </div>
          </div>
        </>
      )}

      {/* INTERNSHIPS */}
      {tab === "internships" && (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Internships</h2>
          <div className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              {isEditing(internshipForm) ? "Edit Internship" : "Add Internship"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!internshipForm.company || !internshipForm.role) return;
                if (internshipForm.id === null) {
                  setInternships((prev) => [
                    ...prev,
                    { ...internshipForm, id: Date.now() },
                  ]);
                } else {
                  setInternships((prev) =>
                    prev.map((i) =>
                      i.id === internshipForm.id ? { ...internshipForm } : i
                    )
                  );
                }
                setInternshipForm({
                  id: null,
                  company: "",
                  role: "",
                  status: "",
                });
              }}
              style={{ display: "grid", gap: "0.9rem", maxWidth: "700px" }}
            >
              <input
                placeholder="Company"
                value={internshipForm.company}
                onChange={(e) =>
                  setInternshipForm({
                    ...internshipForm,
                    company: e.target.value,
                  })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Role"
                value={internshipForm.role}
                onChange={(e) =>
                  setInternshipForm({ ...internshipForm, role: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Status (Applied / In Progress / Offer / Rejected)"
                value={internshipForm.status}
                onChange={(e) =>
                  setInternshipForm({
                    ...internshipForm,
                    status: e.target.value,
                  })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" type="submit">
                  {isEditing(internshipForm) ? "Save" : "Add"}
                </button>
                {isEditing(internshipForm) && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setInternshipForm({
                        id: null,
                        company: "",
                        role: "",
                        status: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Internships</h3>
            <div className="card-grid">
              {internships.map((i) => (
                <div key={i.id} className="card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.3rem", color: "#60a5fa" }}>
                    {i.company}
                  </h4>
                  <div style={{ color: "#94a3b8", marginBottom: "0.4rem" }}>
                    {i.role} • {i.status}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setInternshipForm(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setInternships((prev) =>
                          prev.filter((x) => x.id !== i.id)
                        )
                      }
                      style={{
                        background: "rgba(239,68,68,0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.4)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {internships.length === 0 && (
                <div style={{ color: "#64748b" }}>No internships yet.</div>
              )}
            </div>
          </div>
        </>
      )}

      {/* JOBS */}
      {tab === "jobs" && (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Jobs</h2>
          <div className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              {isEditing(jobForm) ? "Edit Job" : "Add Job"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!jobForm.company || !jobForm.role) return;
                if (jobForm.id === null) {
                  setJobs((prev) => [
                    ...prev,
                    { ...jobForm, id: Date.now() },
                  ]);
                } else {
                  setJobs((prev) =>
                    prev.map((j) =>
                      j.id === jobForm.id ? { ...jobForm } : j
                    )
                  );
                }
                setJobForm({
                  id: null,
                  company: "",
                  role: "",
                  status: "",
                });
              }}
              style={{ display: "grid", gap: "0.9rem", maxWidth: "700px" }}
            >
              <input
                placeholder="Company"
                value={jobForm.company}
                onChange={(e) =>
                  setJobForm({ ...jobForm, company: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Role"
                value={jobForm.role}
                onChange={(e) =>
                  setJobForm({ ...jobForm, role: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Status (Applied / OA / Interview / Offer / Rejected)"
                value={jobForm.status}
                onChange={(e) =>
                  setJobForm({ ...jobForm, status: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" type="submit">
                  {isEditing(jobForm) ? "Save" : "Add"}
                </button>
                {isEditing(jobForm) && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setJobForm({
                        id: null,
                        company: "",
                        role: "",
                        status: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Jobs</h3>
            <div className="card-grid">
              {jobs.map((j) => (
                <div key={j.id} className="card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.3rem", color: "#60a5fa" }}>
                    {j.company}
                  </h4>
                  <div style={{ color: "#94a3b8", marginBottom: "0.4rem" }}>
                    {j.role} • {j.status}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setJobForm(j)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setJobs((prev) => prev.filter((x) => x.id !== j.id))
                      }
                      style={{
                        background: "rgba(239,68,68,0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.4)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {jobs.length === 0 && (
                <div style={{ color: "#64748b" }}>No jobs yet.</div>
              )}
            </div>
          </div>
        </>
      )}

      {/* NOTES */}
      {tab === "notes" && (
        <>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Notes</h2>
          <div className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>
              {isEditing(noteForm) ? "Edit Note" : "Add Note"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!noteForm.title) return;
                if (noteForm.id === null) {
                  setNotes((prev) => [
                    ...prev,
                    { ...noteForm, id: Date.now() },
                  ]);
                } else {
                  setNotes((prev) =>
                    prev.map((n) =>
                      n.id === noteForm.id ? { ...noteForm } : n
                    )
                  );
                }
                setNoteForm({ id: null, title: "", category: "" });
              }}
              style={{ display: "grid", gap: "0.9rem", maxWidth: "700px" }}
            >
              <input
                placeholder="Title (Two Pointers, useEffect...)"
                value={noteForm.title}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, title: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <input
                placeholder="Category (DSA / React / JS / System Design)"
                value={noteForm.category}
                onChange={(e) =>
                  setNoteForm({ ...noteForm, category: e.target.value })
                }
                style={{ padding: "0.8rem 1rem", borderRadius: "10px" }}
              />
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn btn-primary" type="submit">
                  {isEditing(noteForm) ? "Save" : "Add"}
                </button>
                {isEditing(noteForm) && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setNoteForm({ id: null, title: "", category: "" })
                    }
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Notes</h3>
            <div className="card-grid">
              {notes.map((n) => (
                <div key={n.id} className="card" style={{ padding: "1.5rem" }}>
                  <h4 style={{ marginBottom: "0.3rem", color: "#60a5fa" }}>
                    {n.title}
                  </h4>
                  <div style={{ color: "#94a3b8", marginBottom: "0.4rem" }}>
                    {n.category}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setNoteForm(n)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        setNotes((prev) => prev.filter((x) => x.id !== n.id))
                      }
                      style={{
                        background: "rgba(239,68,68,0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239,68,68,0.4)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {notes.length === 0 && (
                <div style={{ color: "#64748b" }}>No notes yet.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

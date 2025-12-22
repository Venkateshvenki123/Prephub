import { useState } from "react";
import { initialTracks } from "../data/freeCourses";

const AdminCourses = () => {
  const [authorized, setAuthorized] = useState(false);
  const [pin, setPin] = useState("");
  const [tracks, setTracks] = useState(initialTracks);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form, setForm] = useState({
    id: "",
    trackId: "",
    name: "",
    desc: "",
    link: "",
  });

  const resetForm = () => {
    setEditingCourse(null);
    setForm({ id: "", trackId: "", name: "", desc: "", link: "" });
  };

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
          <p style={{ color: "#94a3b8" }}>
            This area is restricted. Enter admin PIN to continue.
          </p>
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
              if (pin === "1234admin") {
                setAuthorized(true);
              } else {
                alert("Wrong PIN");
              }
            }}
          >
            Enter
          </button>
          <p style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.85rem" }}>
            Demo only. Do not use for real security.
          </p>
        </div>
      </div>
    );
  }

  const handleEdit = (trackId, course) => {
    setEditingCourse({ trackId, id: course.id });
    setForm({
      id: course.id,
      trackId,
      name: course.name,
      desc: course.desc,
      link: course.link,
    });
  };

  const handleDelete = (trackId, courseId) => {
    setTracks(prev =>
      prev.map(track =>
        track.id === trackId
          ? { ...track, items: track.items.filter(c => c.id !== courseId) }
          : track
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.trackId || !form.name || !form.link) return;

    if (editingCourse) {
      // update
      setTracks(prev =>
        prev.map(track =>
          track.id === form.trackId
            ? {
                ...track,
                items: track.items.map(c =>
                  c.id === editingCourse.id
                    ? { ...c, name: form.name, desc: form.desc, link: form.link }
                    : c
                ),
              }
            : track
        )
      );
    } else {
      // create
      const newCourse = {
        id: crypto.randomUUID(),
        name: form.name,
        desc: form.desc,
        link: form.link,
      };
      setTracks(prev =>
        prev.map(track =>
          track.id === form.trackId
            ? { ...track, items: [...track.items, newCourse] }
            : track
        )
      );
    }
    resetForm();
  };

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
          Admin – Free Courses
        </h1>
        <p style={{ color: "#94a3b8" }}>
          Create, edit, or delete free course links for the Free Courses page (frontend only).
        </p>
      </section>

      {/* Form */}
      <div className="card" style={{ maxWidth: "700px", margin: "0 auto 3rem", padding: "2.5rem" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>
          {editingCourse ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <select
            value={form.trackId}
            onChange={(e) => setForm({ ...form, trackId: e.target.value })}
            style={{
              padding: "0.9rem 1rem",
              borderRadius: "10px",
              border: "1px solid rgba(71,85,105,0.6)",
              background: "rgba(15,23,42,0.9)",
              color: "#f8fafc",
            }}
            required
          >
            <option value="">Select Track</option>
            {tracks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Course name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            required
          />

          <textarea
            placeholder="Short description"
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            rows={3}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
          />

          <input
            type="url"
            placeholder="Course URL (https://...)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            required
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.9rem 1.8rem" }}>
              {editingCourse ? "Save Changes" : "Create Course"}
            </button>
            {editingCourse && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
                style={{ padding: "0.9rem 1.8rem" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Current courses overview */}
      <section>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>All Tracks & Courses</h2>
        {tracks.map(track => (
          <div key={track.id} className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "#60a5fa" }}>
              {track.title}
            </h3>
            <div style={{ color: "#94a3b8", marginBottom: "1rem" }}>{track.level}</div>
            {track.items.length === 0 && (
              <div style={{ color: "#64748b", fontSize: "0.95rem" }}>No courses yet in this track.</div>
            )}
            <div className="card-grid">
              {track.items.map(course => (
                <div key={course.id} className="card" style={{ padding: "1.75rem" }}>
                  <h4 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{course.name}</h4>
                  <p style={{ color: "#e2e8f0", fontSize: "0.95rem", marginBottom: "0.8rem" }}>
                    {course.desc}
                  </p>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3b82f6", fontSize: "0.9rem" }}
                  >
                    {course.link}
                  </a>
                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(track.id, course)}
                      style={{ padding: "0.65rem 1.3rem", fontSize: "0.9rem" }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(track.id, course.id)}
                      style={{
                        padding: "0.65rem 1.3rem",
                        fontSize: "0.9rem",
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
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminCourses;

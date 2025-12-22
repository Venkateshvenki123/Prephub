import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    // Demo only: store in localStorage
    const user = { name: form.name, email: form.email, password: form.password };
    localStorage.setItem("demoUser", JSON.stringify(user));

    navigate("/login");
  };

  return (
    <div className="container">
      <section className="hero" style={{ textAlign: "center", paddingBottom: "2rem" }}>
        <h1>Create Account</h1>
        <p style={{ color: "#94a3b8" }}>Frontend-only demo. Not secure for real use.</p>
      </section>

      <div className="card" style={{ maxWidth: "480px", margin: "0 auto", padding: "2.5rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem" }}>
          <input
            name="name"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
          />

          {error && <div style={{ color: "#f97373", fontSize: "0.9rem" }}>{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ padding: "0.9rem 1.5rem" }}>
            Create account
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          Already have an account? <a href="/login" style={{ color: "#3b82f6" }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

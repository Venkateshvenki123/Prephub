import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = localStorage.getItem("demoUser");
    if (!stored) {
      setError("No account found. Please sign up first.");
      return;
    }
    const user = JSON.parse(stored);
    if (user.email === form.email && user.password === form.password) {
      localStorage.setItem("demoAuth", "true");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <section className="hero" style={{ textAlign: "center", paddingBottom: "2rem" }}>
        <h1>Login</h1>
        <p style={{ color: "#94a3b8" }}>Frontend-only login using localStorage.</p>
      </section>

      <div className="card" style={{ maxWidth: "480px", margin: "0 auto", padding: "2.5rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1.25rem" }}>
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
            Login
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          Don’t have an account? <a href="/signup" style={{ color: "#3b82f6" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

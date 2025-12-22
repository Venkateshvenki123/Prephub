import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      setError("All fields are required");
      return;
    }
    const user = {
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    };
    localStorage.setItem("demoUser", JSON.stringify(user));
    setError("");
    setMode("login");
    setLoginForm({ email: signupForm.email, password: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("demoUser");
    if (!stored) {
      setError("No account found. Please sign up first.");
      return;
    }
    const user = JSON.parse(stored);
    if (user.email === loginForm.email && user.password === loginForm.password) {
      localStorage.setItem("demoAuth", "true");
      setError("");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
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
          Login / Sign Up
        </h1>
        <p style={{ color: "#94a3b8" }}>Frontend-only demo auth using localStorage.</p>
      </section>

      <div className="card" style={{ maxWidth: "520px", margin: "0 auto", padding: "2.5rem" }}>
        {/* Toggle buttons */}
        <div style={{ display: "flex", marginBottom: "2rem", borderRadius: "999px", background: "rgba(15,23,42,0.9)", padding: "0.25rem" }}>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: mode === "login" ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "transparent",
              color: mode === "login" ? "#fff" : "#94a3b8",
              fontWeight: 600,
            }}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("signup"); setError(""); }}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background: mode === "signup" ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "transparent",
              color: mode === "signup" ? "#fff" : "#94a3b8",
              fontWeight: 600,
            }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div style={{ marginBottom: "1rem", color: "#f97373", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        {/* Login form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} style={{ display: "grid", gap: "1.1rem" }}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0.9rem 1.5rem" }}>
              Login
            </button>
          </form>
        )}

        {/* Signup form */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} style={{ display: "grid", gap: "1.1rem" }}>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              style={{ padding: "0.9rem 1rem", borderRadius: "10px" }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "0.9rem 1.5rem" }}>
              Create account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;

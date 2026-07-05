import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo/logo.png";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const user = await registerUser(form);
      login(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <img src={logo} alt="WanderWise" />
        <h2>Start your journey</h2>
        <p>Join WanderWise and plan every trip with confidence — free forever.</p>
      </div>

      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p className="auth-sub">It takes less than a minute.</p>

          {error && <div className="form-error">⚠ {error}</div>}

          <label className="form-field">
            <span>Full Name</span>
            <input
              type="text"
              name="name"
              placeholder="Anshika Aggarwal"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <div className="password-wrap">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </label>

          <button className="btn-primary auth-submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
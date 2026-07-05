import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../services/authService";
import logo from "../assets/logo/logo.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* ===== BRAND PANEL ===== */}
      <div className="auth-brand">
        <img src={logo} alt="WanderWise" />
        <h2>Welcome back, explorer</h2>
        <p>Your trips, budgets and plans are right where you left them.</p>
      </div>

      {/* ===== FORM PANEL ===== */}
      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p className="auth-sub">Sign in to continue planning.</p>

          {error && <div className="form-error">⚠ {error}</div>}

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="form-field">
            <span>Password</span>
            <div className="password-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

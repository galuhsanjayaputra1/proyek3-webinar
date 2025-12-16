import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === form.email);

    if (!user) return alert("Email tidak terdaftar!");
    if (user.password !== form.password) return alert("Password salah!");

    login(user); // 🔥 WAJIB pakai AuthContext

    alert("Login berhasil!");

    if (!user.isProfileComplete) {
      navigate("/profile");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* TOMBOL KEMBALI KE HOME */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          style={{
            background: "#e5e7eb",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            marginBottom: "16px"
          }}
        >
          ← Kembali ke Home
        </button>

        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

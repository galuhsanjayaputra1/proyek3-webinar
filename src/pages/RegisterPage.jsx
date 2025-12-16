import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      fullname: form.fullname,
      email: form.email,
      password: form.password,

      // ➕ TAMBAHAN
      photo: "",
      isProfileComplete: false
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Daftar Akun</h2>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.fullname}
            onChange={(e) =>
              setForm({ ...form, fullname: e.target.value })
            }
            required
          />

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
            Daftar
          </button>
        </form>

        <p className="auth-switch">
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
    </div>
  );
}

export default Register;

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState(user || {});
  const navigate = useNavigate();

  if (!user) return <h2 className="not-found">Anda belum login</h2>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...form,
      isProfileComplete: true
    };

    login(updatedUser);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Profil berhasil diperbarui!");
    navigate("/home");
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card">

        <img
          src={
            form.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="user"
          className="profile-photo"
        />

        <h2 className="profile-title">{form.fullname}</h2>
        <p className="profile-email">{form.email}</p>

        <div className="profile-form">
          <label>Nama Lengkap</label>
          <input
            name="fullname"
            value={form.fullname || ""}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password || ""}
            onChange={handleChange}
          />

          <label>Upload Foto Profil</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />

          <button className="save-btn" onClick={handleSave}>
            Simpan Perubahan
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;

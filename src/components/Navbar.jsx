import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  const goProfile = () => {
    navigate("/profile");
    setProfileOpen(false);
  };

  return (
    <nav className="nav">
      <div className="nav-container">

        {/* LOGO */}
        <div className="nav-logo">
          <a href="/home">WEBINAR ULBI</a>
        </div>

        {/* HAMBURGER */}
        <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>

        {/* MENU */}
        <ul className={open ? "nav-menu active" : "nav-menu"}>
          <li><a href="/home">Home</a></li>
          <li><a href="#courses">Organisasi</a></li>
          <li><a href="#event">Event</a></li>
          <li><a href="#tutors">Tutors</a></li>
          <li><a href="#partners">Partners</a></li>

          {/* BELUM LOGIN */}
          {!user && (
            <>
              <li><a className="btn-login" href="/login">Login</a></li>
              <li><a className="btn-register" href="/register">Register</a></li>
            </>
          )}

          {/* SUDAH LOGIN */}
          {user && (
            <li className="nav-profile-wrapper">
              <div
                className="nav-profile"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={user.photo || "/default-profile.png"}
                  alt="profile"
                  className="profile-img"
                />
                <span className="profile-name">{user.fullname}</span>
              </div>

              {/* DROPDOWN */}
              {profileOpen && (
                <div className="profile-dropdown">
                  <p onClick={goProfile}>My Profile</p>
                  <p onClick={handleLogout} className="logout-text">
                    Logout
                  </p>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

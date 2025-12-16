import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Events.css";

function Events({ eventList }) {
  const navigate = useNavigate();

  const handleJoin = (index) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    // Jika belum login → arahkan ke /login
    if (!user) {
      alert("Anda harus login terlebih dahulu untuk berlangganan event!");
      navigate("/login");
      return;
    }

    // Jika sudah login → masuk ke halaman event detail
    navigate(`/event/${index}`);
  };

  return (
    <div className="event-list">
      {eventList.map((item, index) => (
        <div key={index} className="event-card">
          <img src={item.image} alt={item.title} />

          <div className="event-content">
            <h3>{item.title}</h3>
            <p className="event-date">{item.date}</p>
            <p className="event-price">{item.price}</p>

            {/* Tombol Berlangganan dengan pengecekan login */}
            <button
              className="btn-event"
              onClick={() => handleJoin(index)}
            >
              Berlangganan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Events;

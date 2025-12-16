import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import "../styles/EventDetail.css";
import { useState } from "react";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useData();
  const event = events[id];

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!email || !phone) {
      setError("Harap isi semua data terlebih dahulu!");
      return;
    }

    setError(""); // hapus error saat data valid

    navigate(`/payment/${id}`, {
      state: {
        email: email,
        phone: phone,
      },
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>Pendaftaran Event</h2>

        {/* INPUT FORM */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>No. HP</label>
          <input
            type="text"
            placeholder="Masukkan no. HP kamu"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* PESAN ERROR */}
          {error && <p className="error-text">{error}</p>}
        </div>

        <h3 className="batch-title">Batch Bootcamp</h3>

        <div className="batch-card">
          <h4>{event.title}</h4>
          <p><strong>Timeline</strong>: {event.date}</p>
          <p><strong>Biaya</strong>: {event.price}</p>
        </div>

        <div className="modal-buttons">
          <button onClick={() => navigate("/home")} className="btn-gray">Tutup</button>

          <button
            onClick={handlePayment}
            className="btn-blue"
            disabled={!email || !phone} // ❗ tombol disable jika belum terisi
            style={{
              opacity: !email || !phone ? 0.5 : 1,
              cursor: !email || !phone ? "not-allowed" : "pointer",
            }}
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;

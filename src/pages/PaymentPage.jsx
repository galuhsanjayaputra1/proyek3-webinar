import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import "../styles/Payment.css";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useData();
  const event = events[id];

  const [openQRIS, setOpenQRIS] = useState(false);
  const [qrPaid, setQrPaid] = useState(false);
  const [timer, setTimer] = useState(0);
  const [expired, setExpired] = useState(false);

  // pop-up validasi
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleOpenQR = () => {
    setOpenQRIS(true);
    setTimer(180);
    setExpired(false);
    setQrPaid(false);
  };

  const handlePaymentSuccess = () => {
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
    // Mock ID storage, simple check
    if (!purchasedCourses.includes(parseInt(id))) {
      purchasedCourses.push(parseInt(id));
      localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
    }
    // No alert needed if we want smooth auto-redirect, or a quick one
    navigate(`/course/${id}`);
  };

  // TIMER 180s
  useEffect(() => {
    if (!openQRIS) return;

    if (timer <= 0) {
      setExpired(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, openQRIS]);

  // Simulate auto-payment detection
  useEffect(() => {
    if (!openQRIS) return;

    // Auto-success after 5 seconds for demo
    const timer = setTimeout(() => {
      setQrPaid(true);
      // Instead of immediate redirect, show success state briefly then redirect
      setTimeout(() => {
        handlePaymentSuccess();
      }, 1500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [openQRIS]);

  const colorPrimary = "#2563eb";

  return (
    <div className="payment-page">
      <Navbar />
      <div className='payment-container' style={{ minHeight: '80vh', padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>

        <div className="payment-card" style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '20px' }}>Selesaikan Pembayaran</h1>

          <img src={event.image} alt={event.title} className="payment-image" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '20px' }} />

          <h2 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{event.title}</h2>
          <p className="price" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colorPrimary, marginBottom: '30px' }}>{event.price}</p>

          {!openQRIS ? (
            <button className="pay-method-btn" onClick={handleOpenQR} style={{ background: colorPrimary, color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
              Bayar Sekarang (QRIS)
            </button>
          ) : (
            <div className="qr-section">
              <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '10px', border: `2px dashed ${colorPrimary}` }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Scan QRIS</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QRIS" className="qris-img" style={{ width: '180px', height: '180px' }} />

                {!qrPaid ? (
                  <div style={{ marginTop: '15px' }}>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>Menunggu pembayaran...</p>
                    <div className="loader" style={{ width: '20px', height: '20px', border: '3px solid #e2e8f0', borderTop: `3px solid ${colorPrimary}`, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>Otomatis terdeteksi sistem</p>
                  </div>
                ) : (
                  <div style={{ marginTop: '15px', color: '#10b981', fontWeight: 'bold', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '40px' }}>✅</div>
                    <span>Pembayaran Berhasil!</span>
                    <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Mengalihkan ke kursus...</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
       `}</style>
    </div>
  );
}

export default PaymentPage;

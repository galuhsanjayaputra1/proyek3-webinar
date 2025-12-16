import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import "../styles/CoursePage.css";

function CoursePage() {
  const { id } = useParams();
  const { events } = useData();
  const event = events[id];

  const navigate = useNavigate(); // ▶ fungsi navigate

  const handleBack = () => {
    navigate("/"); // ▶ kembali ke halaman utama
  };

  return (
    <div className="course-container">

      {/* TOMBOL KEMBALI */}
      <button className="back-button" onClick={handleBack}>
        ⬅ Kembali
      </button>

      <h2 className="course-title">{event.title} - Modul Belajar</h2>

      <div className="course-wrapper">

        {/* VIDEO PLAYBACK */}
        <div className="video-section">
          {event.video ? (
            <video
              key={event.video}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
            >
              <source src={event.video} type="video/mp4" />
              Browser kamu tidak mendukung video.
            </video>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', background: '#eee' }}>Video belum tersedia untuk event ini.</div>
          )}
        </div>

        {/* MODUL */}
        <div className="module-section">
          <h3>Materi Pembelajaran</h3>

          <div className="module-content">
            {event.pdf ? (
              <>
                {/* Module Card */}
                <div
                  className="module-card"
                  onClick={() => document.getElementById('module-modal').style.display = 'flex'}
                  style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    width: '50px', height: '50px',
                    background: '#fee2e2',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ef4444', fontSize: '1.8rem'
                  }}>
                    📄
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#1e293b' }}>{event.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>Klik untuk membaca modul lengkap</p>
                  </div>
                  <div style={{ color: '#2563eb', fontWeight: '500' }}>Buka ↗</div>
                </div>

                {/* MODAL VIEWER - FULLSCREEN */}
                <div
                  id="module-modal"
                  style={{
                    display: 'none',
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: '#000', // Dark background like typical viewers
                    zIndex: 9999,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0 // Full screen
                  }}
                >
                  <div style={{
                    background: '#1e1e1e', // Darker inner bg
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    {/* Modal Header */}
                    <div style={{
                      padding: '10px 20px',
                      borderBottom: '1px solid #333',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#111',
                      color: '#fff'
                    }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '500', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>📄</span> {event.title}
                      </h3>
                      <button
                        onClick={() => document.getElementById('module-modal').style.display = 'none'}
                        style={{
                          background: '#333',
                          border: 'none',
                          color: '#fff',
                          padding: '5px 15px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Tutup ✕
                      </button>
                    </div>

                    {/* PDF Viewer */}
                    <div style={{ flex: 1, position: 'relative', background: '#525659' }}>
                      <iframe
                        key={event.pdf}
                        src={`${event.pdf}#toolbar=0&navpanes=0&view=FitH`}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', display: 'block' }}
                        title="Modul Viewer Full"
                      />
                      {/* Removed overlay to allow scrolling */}
                    </div>
                  </div>
                </div>
              </>

            ) : (
              <ul className="module-list">
                <li>📘 Pengenalan Dasar</li>
                <li>🚀 Instalasi & Setup</li>
                <li>⚙ Komponen & Hooks</li>
                <li>💡 Mini Project</li>
                <li>🏁 Final Project</li>
              </ul>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default CoursePage;

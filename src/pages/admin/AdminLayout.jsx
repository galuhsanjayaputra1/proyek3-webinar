import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import '../../styles/AdminLayout.css';

function AdminLayout() {
    const { admin, logoutAdmin } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h3>Webinar Admin</h3>
                </div>
                <nav className="admin-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/events" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        Manage Events
                    </NavLink>
                    <NavLink to="/admin/tutors" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        Manage Tutors
                    </NavLink>
                    <NavLink to="/admin/partners" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        Manage Partners
                    </NavLink>
                    <NavLink to="/admin/landing" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                        Manage Landing
                    </NavLink>
                </nav>
                <div className="admin-user-info">
                    <div className="user-details">
                        <label style={{ cursor: 'pointer' }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const updatedAdmin = { ...admin, photo: reader.result };
                                            // Ideally update via context/auth, but for now direct update + storage hack to match pattern
                                            localStorage.setItem('admin_user', JSON.stringify(updatedAdmin));
                                            window.location.reload(); // Simple reload to reflect changes for now
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <img src={admin?.photo || 'https://via.placeholder.com/40'} alt="Admin" title="Click to change photo" />
                        </label>
                        <span>{admin?.fullname || 'Admin'}</span>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </aside>
            <main className="admin-content">
                <header className="admin-header">
                    <h2>Administration Panel</h2>
                </header>
                <div className="admin-page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;

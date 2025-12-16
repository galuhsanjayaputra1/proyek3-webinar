import { useData } from '../../context/DataContext';

function AdminDashboard() {
    const { events, tutors, partners } = useData();

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div className="admin-card" style={{ borderLeft: '4px solid #2563eb' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Total Events</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>{events.length}</p>
                </div>

                <div className="admin-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Total Tutors</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>{tutors.length}</p>
                </div>

                <div className="admin-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#6b7280' }}>Total Partners</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>{partners ? partners.length : 0}</p>
                </div>
            </div>

            <div className="admin-card" style={{ marginTop: '20px' }}>
                <h3>Recent Activity</h3>
                <p style={{ color: '#666' }}>System is active and running. No recent alerts.</p>
            </div>

        </div>
    );
}

export default AdminDashboard;

import { useState } from 'react';
import { useData } from '../../context/DataContext';

function ManageEvents() {
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ id: null, title: '', date: '', price: '', image: '', pdf: '', video: '' });
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            deleteEvent(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateEvent(currentEvent);
        } else {
            addEvent(currentEvent);
        }
        resetForm();
    };

    const resetForm = () => {
        setCurrentEvent({ id: null, title: '', date: '', price: '', image: '', pdf: '', video: '' });
        setIsEditing(false);
        setShowForm(false);
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Events</h1>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Event'}
                </button>
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: '20px' }}>
                    <h3>{isEditing ? 'Edit Event' : 'Add New Event'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentEvent.title}
                                    onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., 20 Januari 2026"
                                    value={currentEvent.date}
                                    onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Rp 500.000"
                                    value={currentEvent.price}
                                    onChange={e => setCurrentEvent({ ...currentEvent, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Event Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setCurrentEvent({ ...currentEvent, image: url });
                                        }
                                    }}
                                />
                                {currentEvent.image && <img src={currentEvent.image} alt="Preview" style={{ width: '100px', marginTop: '10px', borderRadius: '5px' }} />}
                            </div>
                            <div className="form-group">
                                <label>Upload PDF Module</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setCurrentEvent({ ...currentEvent, pdf: url });
                                        }
                                    }}
                                />
                                {currentEvent.pdf && <p style={{ fontSize: '0.8rem', color: '#2563eb', marginTop: '5px' }}>File Selected</p>}
                            </div>
                            <div className="form-group">
                                <label>Upload Video</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setCurrentEvent({ ...currentEvent, video: url });
                                        }
                                    }}
                                />
                                {currentEvent.video && <p style={{ fontSize: '0.8rem', color: '#2563eb', marginTop: '5px' }}>File Selected</p>}
                            </div>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button type="submit" className="btn-primary">{isEditing ? 'Update' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                                <td>
                                    <button className="action-btn btn-edit" onClick={() => handleEdit(event)}>Edit</button>
                                    <button className="action-btn btn-delete" onClick={() => handleDelete(event.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageEvents;

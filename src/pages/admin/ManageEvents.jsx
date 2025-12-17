import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

function ManageEvents() {
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ id: null, title: '', date: '', price: '', image: '', pdf: '', video: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    // Helper to convert file to Base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setIsEditing(true);
        setIsFormOpen(true);
    };

    const confirmDelete = (event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        if (eventToDelete) {
            deleteEvent(eventToDelete.id);
            setEventToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Determine file handling logic here if needed (e.g., waiting for validation)
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
        setIsFormOpen(false);
    };

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertFileToBase64(file);
                setCurrentEvent(prev => ({ ...prev, [field]: base64 }));
            } catch (error) {
                console.error("Error converting file:", error);
                alert("Failed to process file. Please try again.");
            }
        }
    };

    // Render Form Modal Footer
    const formFooter = (
        <>
            <button type="button" className="btn-outline" onClick={resetForm} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151' }}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSubmit}>
                {isEditing ? 'Update Event' : 'Save Event'}
            </button>
        </>
    );

    // Render Delete Modal Footer
    const deleteFooter = (
        <>
            <button type="button" className="btn-outline" onClick={() => setIsDeleteModalOpen(false)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151' }}>Cancel</button>
            <button type="button" className="btn-primary" onClick={executeDelete} style={{ background: '#ef4444' }}>
                Delete
            </button>
        </>
    );

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Events</h1>
                <button className="btn-primary" onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    Add New Event
                </button>
            </div>

            {/* Event List Table */}
            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    {event.image && (
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    )}
                                </td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                                <td>
                                    <button className="action-btn btn-edit" onClick={() => handleEdit(event)}>Edit</button>
                                    <button className="action-btn btn-delete" onClick={() => confirmDelete(event)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={isEditing ? 'Edit Event' : 'Add New Event'}
                footer={formFooter}
            >
                <form className="modal-form-grid" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            required
                            value={currentEvent.title}
                            onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                            className="form-input"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
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
                            className="form-input"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
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
                            className="form-input"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Image</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} />
                        {currentEvent.image && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={currentEvent.image} alt="Preview" style={{ width: '100px', borderRadius: '8px' }} />
                                <p style={{ fontSize: '12px', color: '#666' }}>Image Loaded</p>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>PDF Module</label>
                        <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'pdf')} />
                        {currentEvent.pdf && <p style={{ color: '#2563eb', fontSize: '14px', marginTop: '5px' }}>PDF Loaded</p>}
                    </div>

                    <div className="form-group">
                        <label>Video Material</label>
                        <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
                        {currentEvent.video && <p style={{ color: '#2563eb', fontSize: '14px', marginTop: '5px' }}>Video Loaded</p>}
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Event"
                footer={deleteFooter}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <p style={{ fontSize: '1.1rem', color: '#374151' }}>Are you sure you want to delete this event?</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '8px' }}>
                        This action cannot be undone. <b>{eventToDelete?.title}</b> will be permanently removed.
                    </p>
                </div>
            </Modal>
        </div>
    );
}

export default ManageEvents;

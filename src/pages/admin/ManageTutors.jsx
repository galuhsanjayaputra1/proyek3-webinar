import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

function ManageTutors() {
    const { tutors, addTutor, updateTutor, deleteTutor } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTutor, setCurrentTutor] = useState({ id: null, name: '', image: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [tutorToDelete, setTutorToDelete] = useState(null);

    // Helper to convert file to Base64
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleEdit = (tutor) => {
        setCurrentTutor(tutor);
        setIsEditing(true);
        setIsFormOpen(true);
    };

    const confirmDelete = (tutor) => {
        setTutorToDelete(tutor);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        if (tutorToDelete) {
            deleteTutor(tutorToDelete.id);
            setTutorToDelete(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateTutor(currentTutor);
        } else {
            addTutor(currentTutor);
        }
        resetForm();
    };

    const resetForm = () => {
        setCurrentTutor({ id: null, name: '', image: '' });
        setIsEditing(false);
        setIsFormOpen(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertFileToBase64(file);
                setCurrentTutor(prev => ({ ...prev, image: base64 }));
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
                {isEditing ? 'Update Tutor' : 'Save Tutor'}
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
                <h1 className="admin-page-title">Manage Tutors</h1>
                <button className="btn-primary" onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    Add New Tutor
                </button>
            </div>

            {/* Tutors List Table */}
            <div className="admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor) => (
                            <tr key={tutor.id}>
                                <td>
                                    <img src={tutor.image} alt={tutor.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                                </td>
                                <td>{tutor.name}</td>
                                <td>
                                    <button className="action-btn btn-edit" onClick={() => handleEdit(tutor)}>Edit</button>
                                    <button className="action-btn btn-delete" onClick={() => confirmDelete(tutor)}>Delete</button>
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
                title={isEditing ? 'Edit Tutor' : 'Add New Tutor'}
                footer={formFooter}
            >
                <form className="modal-form-grid" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            required
                            value={currentTutor.name}
                            onChange={e => setCurrentTutor({ ...currentTutor, name: e.target.value })}
                            className="form-input"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload Tutor Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {currentTutor.image && <img src={currentTutor.image} alt="Preview" style={{ width: '80px', height: '80px', marginTop: '10px', borderRadius: '50%', objectFit: 'cover' }} />}
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Tutor"
                footer={deleteFooter}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <p style={{ fontSize: '1.1rem', color: '#374151' }}>Are you sure you want to delete this tutor?</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '8px' }}>
                        <b>{tutorToDelete?.name}</b> will be removed permanently.
                    </p>
                </div>
            </Modal>
        </div>
    );
}

export default ManageTutors;

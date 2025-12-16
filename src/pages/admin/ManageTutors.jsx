import { useState } from 'react';
import { useData } from '../../context/DataContext';

function ManageTutors() {
    const { tutors, addTutor, updateTutor, deleteTutor } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTutor, setCurrentTutor] = useState({ id: null, name: '', image: '' });
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (tutor) => {
        setCurrentTutor(tutor);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this tutor?')) {
            deleteTutor(id);
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
        setShowForm(false);
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Tutors</h1>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Tutor'}
                </button>
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: '20px' }}>
                    <h3>{isEditing ? 'Edit Tutor' : 'Add New Tutor'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentTutor.name}
                                    onChange={e => setCurrentTutor({ ...currentTutor, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Tutor Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setCurrentTutor({ ...currentTutor, image: url });
                                        }
                                    }}
                                />
                                {currentTutor.image && <img src={currentTutor.image} alt="Preview" style={{ width: '50px', height: '50px', marginTop: '10px', borderRadius: '50%', objectFit: 'cover' }} />}
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
                                    <button className="action-btn btn-delete" onClick={() => handleDelete(tutor.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageTutors;

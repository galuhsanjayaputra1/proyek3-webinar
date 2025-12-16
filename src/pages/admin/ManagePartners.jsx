import { useState } from 'react';
import { useData } from '../../context/DataContext';

function ManagePartners() {
    const { partners, addPartner, updatePartner, deletePartner } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPartner, setCurrentPartner] = useState({ id: null, name: '', image: '' });
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (partner) => {
        setCurrentPartner(partner);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            deletePartner(id);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updatePartner(currentPartner);
        } else {
            addPartner(currentPartner);
        }
        resetForm();
    };

    const resetForm = () => {
        setCurrentPartner({ id: null, name: '', image: '' });
        setIsEditing(false);
        setShowForm(false);
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Partners</h1>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Partner'}
                </button>
            </div>

            {showForm && (
                <div className="admin-card" style={{ marginBottom: '20px' }}>
                    <h3>{isEditing ? 'Edit Partner' : 'Add New Partner'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentPartner.name}
                                    onChange={e => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Partner Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setCurrentPartner({ ...currentPartner, image: url });
                                        }
                                    }}
                                />
                                {currentPartner.image && <img src={currentPartner.image} alt="Preview" style={{ width: '50px', height: '50px', marginTop: '10px', objectFit: 'contain' }} />}
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
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {partners && partners.map((partner) => (
                            <tr key={partner.id}>
                                <td>
                                    <img src={partner.image} alt={partner.name} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                                </td>
                                <td>{partner.name}</td>
                                <td>
                                    <button className="action-btn btn-edit" onClick={() => handleEdit(partner)}>Edit</button>
                                    <button className="action-btn btn-delete" onClick={() => handleDelete(partner.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManagePartners;

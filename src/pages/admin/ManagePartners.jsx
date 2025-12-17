import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';

function ManagePartners() {
    const { partners, addPartner, updatePartner, deletePartner } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPartner, setCurrentPartner] = useState({ id: null, name: '', image: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [partnerToDelete, setPartnerToDelete] = useState(null);

    // Helper
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleEdit = (partner) => {
        setCurrentPartner(partner);
        setIsEditing(true);
        setIsFormOpen(true);
    };

    const confirmDelete = (partner) => {
        setPartnerToDelete(partner);
        setIsDeleteModalOpen(true);
    };

    const executeDelete = () => {
        if (partnerToDelete) {
            deletePartner(partnerToDelete.id);
            setPartnerToDelete(null);
            setIsDeleteModalOpen(false);
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
        setIsFormOpen(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertFileToBase64(file);
                setCurrentPartner(prev => ({ ...prev, image: base64 }));
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
                {isEditing ? 'Update Partner' : 'Save Partner'}
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
                <h1 className="admin-page-title">Manage Partners</h1>
                <button className="btn-primary" onClick={() => { resetForm(); setIsFormOpen(true); }}>
                    Add New Partner
                </button>
            </div>

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
                                    <button className="action-btn btn-delete" onClick={() => confirmDelete(partner)}>Delete</button>
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
                title={isEditing ? 'Edit Partner' : 'Add New Partner'}
                footer={formFooter}
            >
                <form className="modal-form-grid" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            required
                            value={currentPartner.name}
                            onChange={e => setCurrentPartner({ ...currentPartner, name: e.target.value })}
                            className="form-input"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload Partner Logo</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {currentPartner.image && <img src={currentPartner.image} alt="Preview" style={{ width: '80px', height: '80px', marginTop: '10px', objectFit: 'contain' }} />}
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Partner"
                footer={deleteFooter}
            >
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <p style={{ fontSize: '1.1rem', color: '#374151' }}>Are you sure you want to delete this partner?</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '8px' }}>
                        <b>{partnerToDelete?.name}</b> will be removed permanently.
                    </p>
                </div>
            </Modal>
        </div>
    );
}

export default ManagePartners;

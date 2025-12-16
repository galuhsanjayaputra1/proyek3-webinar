import { useState } from 'react';
import { useData } from '../../context/DataContext';

function ManageLanding() {
    const { landingData, updateLandingData } = useData();

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Manage Landing Page</h1>
            </div>

            <div className="admin-card" style={{ marginBottom: '20px' }}>
                <h3>Hero Section (Home)</h3>
                <div className="form-group">
                    <label>Current Hero Image</label>
                    <img src={landingData.home.image} alt="Hero" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />

                    <label>Upload New Hero Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                updateLandingData('home', { image: url });
                            }
                        }}
                    />
                </div>

            </div>

            <div className="admin-card">
                <h3>Organization Section</h3>
                <div className="form-group">
                    <label>Current Organization Image</label>
                    <img src={landingData.organization.image} alt="Organization" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px', marginBottom: '10px' }} />

                    <label>Upload New Organization Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                updateLandingData('organization', { image: url });
                            }
                        }}
                    />
                </div>

            </div>
        </div>
    );
}

export default ManageLanding;

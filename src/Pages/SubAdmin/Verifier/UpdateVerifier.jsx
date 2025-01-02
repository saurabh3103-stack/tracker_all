import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPopup from '../../../Component/SuccessPopup';
import Brandcrump from '../../../Component/Brandcrump';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // Importing toast components

const UpdateVerifier = () => {
  const location = useLocation();
  const selectedData = location.state;

  const [formData, setFormData] = useState({
    zone_name: '',
    zone_head: '',
    name: '',
    mobile: '',
    email: '',
    photo: null,
    designation: '',
    dob: '',
    aadhaar_number: '',
    address: '',
  });

  const [zones, setZones] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedData) {
      setFormData({
        zone_name: selectedData.zone_id || '',
        zone_head: selectedData.role || '',
        name: selectedData.name || '',
        mobile: selectedData.mobile_number || '',
        email: selectedData.email || '',
        photo: selectedData.photo || null,
        designation: selectedData.designation || '',
        dob: selectedData.dob || '',
        aadhaar_number: selectedData.aadhaar_number || '',
        address: selectedData.address || '',
      });
    }
  }, [selectedData]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/zones', {
          headers: { 'x-api-key': 'your_secret_key' },
        });
        if (response.status === 200) {
          setZones(response.data);
        } else {
          setError('Failed to fetch zone names.');
        }
      } catch (error) {
        console.error('API Error:', error);
        setError(
          'Failed to fetch zone names. Please check your connection or API endpoint.',
        );
      }
    };
    fetchZones();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/verifier/update/${selectedData._id}`,
        updatedData,
        { headers: { 'x-api-key': 'your_secret_key' } },
      );
      if (response.status === 200) {
        setIsVisible(true);
      }
        toast.success('Verifier updated successfully!'); // Success toast
      
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to update the verifier. Please try again.');
      toast.error('Failed to update the verifier. Please check your connection or API endpoint.'); // Error toast
    }
  };

  const handleClosePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Toaster  position="top-right"
               toastOptions={{
                 style: {
                   transition: 'transform 0.3s ease-in-out', // Smooth sliding animation
                 }}}/>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="Update Verifier"
          url="/dashboard"
          breadcrumb="update Verifier"
        />
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">Update Verifier</h5>
              </div>
              {isVisible && (
                <SuccessPopup
                  isVisible={isVisible}
                  onClose={handleClosePopup}
                />
              )}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="row gx-3">
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="zone_name">
                          Zone Name
                        </label>
                        <select
                          id="zone_name"
                          className="form-control"
                          value={formData.zone_name}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Zone</option>
                          {zones.map((zone) => (
                            <option key={zone._id} value={zone._id}>
                              {zone.zone_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="zone_head">
                          Zone Head
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zone_head"
                          value={formData.zone_head}
                          onChange={handleInputChange}
                          placeholder="Enter Zone Head"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="mobile">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter Mobile Number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="photo">
                          Upload Photo
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="photo"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="designation">
                          Designation
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="Enter Designation"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="dob">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="aadhaar_number">
                          Aadhaar Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="aadhaar_number"
                          value={formData.aadhaar_number}
                          onChange={handleInputChange}
                          placeholder="Enter Aadhaar Number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="address">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter Address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Update Verifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateVerifier;

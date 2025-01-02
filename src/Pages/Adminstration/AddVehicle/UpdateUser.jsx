import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';  // Assuming you're using Bootstrap for the modal

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure data from location state
  const { id, row } = location.state || {};

  const [formData, setFormData] = useState({
    owner_name: '',
    email: '',
    phone_owner: '',
    addhar_number: '',
    owner_dl: '',
    e_rickshaw: '',
    chassis: '',
    fitness: '',
    address_line_f: '',
    address_line_t: '',
    city: '',
    state: '',
    pin_code: '',
    driver_name: '',
    d_phone: '',
    d_addhar_number: '',
    d_dl_number: '',
    d_address_line_f: '',
    d_address_line_t: '',
    d_city: '',
    d_state: '',
    d_pin_code: '',
    e_ricksaw_route: '',
    admin_id: '',
    admin_type: '',
    owner_photo: null,
    addhar_image: null,
    owner_dl_image: null,
    rickshaw_photo: null,
    d_addhar_image: null,
    d_photo: null,
    driver_dl_image: null,
  });

  const [showModal, setShowModal] = useState(false);  // Modal visibility state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the preview modal
  };

  const handleSubmit = async () => {
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch(`http://localhost:3002/api/users/update_user/${id}`, {
        method: 'PUT',
        body: form,
      });
      const data = await response.json();
      if (data.status === 1) {
        alert('User updated successfully');
        navigate('/users');  // Navigate back to the users list or any other page
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating user');
    }
    setShowModal(false); // Close modal after submission
  };

  return (
    <form  onSubmit={handlePreview} encType="multipart/form-data" className="container mt-4">
    {/* Owner Information */}
    <h3 className="mb-4">Owner Information</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="owner_name"
          placeholder="Owner Name"
          value={formData.owner_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="phone_owner"
          placeholder="Phone (Owner)"
          value={formData.phone_owner}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="addhar_number"
          placeholder="Aadhaar Number"
          value={formData.addhar_number}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="owner_dl"
          placeholder="Owner Driving License"
          value={formData.owner_dl}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="owner_photo"
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="addhar_image"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="owner_dl_image"
          onChange={handleChange}
        />
      </div>
    </div>
  
    {/* Rickshaw Information */}
    <h3 className="mb-4">Rickshaw Information</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="e_rickshaw"
          placeholder="Electric Rickshaw"
          value={formData.e_rickshaw}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="chassis"
          placeholder="Chassis Number"
          value={formData.chassis}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="fitness"
          placeholder="Fitness Certificate"
          value={formData.fitness}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="rickshaw_photo"
          onChange={handleChange}
        />
      </div>
    </div>
  
    {/* Address Information */}
    <h3 className="mb-4">Address Information</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="address_line_f"
          placeholder="Address Line 1 (Owner)"
          value={formData.address_line_f}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input type="text"
          className="form-control"
          name="address_line_t"
          placeholder="Address Line 2 (Owner)"
          value={formData.address_line_t}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="city"
          placeholder="City (Owner)"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="state"
          placeholder="State (Owner)"
          value={formData.state}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="pin_code"
          placeholder="Pin Code (Owner)"
          value={formData.pin_code}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  
    {/* Driver Information */}
    <h3 className="mb-4">Driver Information</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="driver_name"
          placeholder="Driver Name"
          value={formData.driver_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_phone"
          placeholder="Driver Phone"
          value={formData.d_phone}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_addhar_number"
          placeholder="Driver Aadhaar Number"
          value={formData.d_addhar_number}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_dl_number"
          placeholder="Driver DL Number"
          value={formData.d_dl_number}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="d_addhar_image"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="d_photo"
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="file"
          className="form-control"
          name="driver_dl_image"
          onChange={handleChange}
        />
      </div>
    </div>
  
    {/* Driver Address */}
    <h3 className="mb-4">Driver Address</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_address_line_f"
          placeholder="Address Line 1 (Driver)"
          value={formData.d_address_line_f}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_address_line_t"
          placeholder="Address Line 2 (Driver)"
          value={formData.d_address_line_t}
          onChange={handleChange}
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_city"
          placeholder="City (Driver)"
          value={formData.d_city}
          onChange={handleChange}
   required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_state"
          placeholder="State (Driver)"
          value={formData.d_state}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="d_pin_code"
          placeholder="Pin Code (Driver)"
          value={formData.d_pin_code}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  
    {/* Other Fields */}
    <h3 className="mb-4">Additional Information</h3>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="e_ricksaw_route"
          placeholder="Rickshaw Route"
          value={formData.e_ricksaw_route}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="admin_id"
          placeholder="Admin ID"
          value={formData.admin_id}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control"
          name="admin_type"
          placeholder="Admin Type"
          value={formData.admin_type}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  
    <button type="submit" className="btn btn-primary">Update User</button>


    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Form Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Owner Information</h4>
          <p>Name: {formData.owner_name}</p>
          <p>Email: {formData.email}</p>
          {/* Display other data similarly */}
          <h4>Rickshaw Information</h4>
          <p>Electric Rickshaw: {formData.e_rickshaw}</p>
          {/* Display other sections */}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </Modal.Footer>
      </Modal>
  </form>
  );
};

export default UpdateUser;

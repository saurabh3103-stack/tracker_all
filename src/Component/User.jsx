import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
// import $ from "jquery";
import '../../public/vendor/datatables/dataTables.bs5.css';
import '../../public/vendor/datatables/dataTables.bs5-custom.css';
import '../../public/vendor/datatables/buttons/dataTables.bs5-custom.css';

const imageUrl  = 'http://localhost:5173/backend/src/assets/upload/';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);   // Data for the selected ID
  const [show, setShow] = useState(false); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/users/', {
          headers: {
            'x-api-key': 'your_secret_key' // Replace with your actual API key
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        console.log(err.message)
      } finally {
        setLoading(false); // Turn off loading once data is fetched
      }
    };
    fetchData();
       // Initialize DataTables
      //  const table = $("#customButtons").DataTable({
      //   lengthMenu: [
      //     [5, 10, 25, 50],
      //     [5, 10, 25, 50, "All"],
      //   ],
      //   dom: "Bfrtip", // Buttons on the top
      //   buttons: ["copy", "csv", "excel", "pdf", "print"], // Define the buttons
      // });
  
      // Cleanup function to destroy DataTable when component unmounts
      // return () => {
      //   table.destroy(true);
      // };
    
  }, []);
  const handleShow = (id) => {
    axios.get(`http://localhost:3002/api/users/${id}`,{
      headers: {
        'x-api-key': 'your_secret_key' // Replace with your actual API key
      }
    })  // Fetch data by ID
      .then((response) => {
        setSelectedData(response.data);
        console.log(response.data);
        setShow(true);  // Show modal
      })
      .catch((error) => {
        console.error('Error fetching data by ID:', error);
        
      });
  };

  const handleClose = () => setShow(false);
  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-xl-6">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <NavLink to="/dashboard">Home</NavLink>
              </li> /
              <li className="breadcrumb breadcrumb"> Vehicle</li>
            </ol>
          </div>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Vehicle List</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table  id="customButtons"  className="table  table-bordered align-middle truncate m-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        
                        <th>Rickshaw Number</th>
                        <th>Chassis Number</th>
                        <th>Owner Name</th>
                        <th>Owner Phone</th>
                        <th>Driver Name</th>
                        <th>Driver Phone</th>
                        <th>Route</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td><a href='javascript:void(0)' onClick={() => handleShow(user._id)}>{user.e_rickshaw}</a></td>
                          <td>{user.chassis}</td>
                          <td>{user.owner_name}</td>
                          <td>{user.phone_owner}</td>
                          <td>{user.driver_name}</td>
                          <td>{user.d_phone}</td>
                          <td>{user.e_ricksaw_route}</td>
                          <td>
                          <button type="button" className="btn btn-outline-success" data-bs-toggle="tooltip modal"
                            data-bs-placement="top" data-bs-custom-className="custom-tooltip-success"
                            data-bs-target="#exampleModalXl" onClick={() => handleShow(user._id)}>
                            <i className="icon-eye"></i>
                          </button>&nbsp;&nbsp;&nbsp;
                          <button type="button" className="btn btn-outline-info" data-bs-toggle="tooltip"
                            data-bs-placement="top" data-bs-custom-className="custom-tooltip-info"
                            data-bs-title="This top tooltip is themed via CSS variables.">
                            <i className="icon-edit"></i>
                          </button>&nbsp;&nbsp;&nbsp;
                          <button type="button" className="btn btn-outline-warning" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-className="custom-tooltip-warning" data-bs-title="Delete Route">
                        <i className="icon-upload"></i>
                      </button>&nbsp;&nbsp;&nbsp;
                      <button type="button" className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-className="custom-tooltip-danger" data-bs-title="Delete Route">
                        <i className="icon-clear"></i>
                      </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Modal show={show} onHide={handleClose} size='xl'>
                  <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Vehicle Details ({selectedData.e_rickshaw})</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {loading ? (
                      <p>Loading...</p>
                    ) : selectedData ? (
                      <div>
                        <div>
                          {selectedData.email}

                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <label className="form-label">E-Rickshaw Photo</label><br/>
                            <img src={imageUrl+selectedData.rickshaw_photo} className="img-fluid" height="200px" width="200px"/>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Owner Photo</label><br/>
                            <img src={imageUrl+selectedData.owner_photo} className="img-fluid" height="200px" width="200px"/>
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Driver Photo</label><br/>
                            <img src={imageUrl+selectedData.d_photo} className="img-fluid" height="200px" width="200px"/>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-12">
                            <div className="card-header">
                              <h5 className="card-title">Owner Details</h5>
                            </div>
                            <div className="card-body vehicle_deails">
                              <div className="row">
                                <div className="col-md-4">
                                  <p><span>Owner Name :</span> {selectedData.owner_name}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Owner Phone :</span> {selectedData.phone_owner}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Owner Email :</span> {selectedData.email}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Aadhar Number :</span> {selectedData.addhar_number}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Owner DL :</span> {selectedData.owner_dl}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>E-Rickshaw Number :</span> {selectedData.e_rickshaw}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Chassis :</span> {selectedData.chassis}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Fitness Expiry :</span> {selectedData.chassis}</p>
                                </div>
                                <div className="col-md-6">
                                  <p><span>Address :</span> {selectedData.address_line_f}&nbsp;
                                  {selectedData.address_line_t}&nbsp;{selectedData.city} &nbsp;{selectedData.state}
                                  &nbsp;{selectedData.pin}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-12">
                            <div className="card-header">
                              <h5 className="card-title">Driver Details</h5>
                            </div>
                            <div className="card-body vehicle_deails">
                              <div className="row">
                                <div className="col-md-4">
                                  <p><span>Driver Name :</span> {selectedData.driver_name}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Driver Phone :</span> {selectedData.d_phone}</p>
                                </div>
                               
                                <div className="col-md-4">
                                  <p><span>Aadhar Number :</span> {selectedData.d_addhar_number}</p>
                                </div>
                                <div className="col-md-4">
                                  <p><span>Driver DL :</span> {selectedData.d_dl_number}</p>
                                </div>
                                <div className="col-md-6">
                                  <p><span>Address :</span> {selectedData.d_address_line_f}&nbsp;
                                  {selectedData.d_address_line_t}&nbsp;{selectedData.d_city} &nbsp;{selectedData.d_state}
                                  &nbsp;{selectedData.d_pin_code}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>No data found</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;

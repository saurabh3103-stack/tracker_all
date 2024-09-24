import React, { createContext, useState, useContext } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import SuccessPopup from './SuccessPopup'; 
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Routes_path() {
    const [isVisible,setisVisible]=useState(false);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const[routes ,setroutes]=useState([]);
    const [selectedData, setSelectedData] = useState(null);   // Data for the selected ID
    const [show, setShow] = useState(false); 
    const [formData,setFormData]= useState(
      {
        start_point:'',
        end_point:''
      });
      const [formErrors,setFormError]=useState({});
      const validateForm = () => {
        return true
      }
      const handleClosePopup = () => {
        setIsSubmitted(false); // Close the popup
        navigate('/route'); // Navigate to the dashboard
      };
      const handleInputChange = (e) =>{
        const {id,value}=e.target;
        setFormData({ ...formData, [id]: value });
      }
      const handleSubmit =async (e) => {
        console.log(formData);
        e.preventDefault();
        if(validateForm()){
          const config ={
            headers:{
              'Content-Type': 'multipart/form-data', // Important for file uploads
              'x-api-key': 'your_secret_key', 
            }
          };
          try {
            console.log(formData);
            const response = await axios.post('http://localhost:3002/api/userPath/add_routes',formData);
            console.log('Success:', response.data);
            setError(''); 
            setIsSubmitted(true);
            setisVisible(true);
            setFormData({
              start_point:'',
              end_point:''
            });
          }
          catch (error){
            console.error('Error:',error);
            setError('Failed to update status.'); 
            setMessage(''); 
          }
        }
      }

      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3002/api/userPath/', {
            headers: {
              'x-api-key': 'your_secret_key' // Replace with your actual API key
            }
          });
          setroutes(response.data);
          console.log(response.data);
        } catch (err) {
          setError(err.message);
          console.log(err.message)
        } finally {
          setLoading(false); // Turn off loading once data is fetched
        }
      };
      fetchData();
      const handleShow = (id) => {
        axios.get(`http://localhost:3002/api/userPath/${id}`,{
          headers: {
            'x-api-key': 'your_secret_key' // Replace with your actual API key
          }
        })  // Fetch data by ID
          .then((response) => {
            setSelectedData(response.data);
            
            setShow(true);  // Show modal
          })
          .catch((error) => {
            console.error('Error fetching data by ID:', error);
            
          });
      };
    
      const handleClose = () => setShow(false);
  
      
    return(
    <>
     <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-xl-6">
            <ol class="breadcrumb mb-1">
              <li class="breadcrumb-item">
                <NavLink to="/dashboard">Home</NavLink>
              </li>/
              <li class="breadcrumb breadcrumb">Route</li>
            </ol>
          </div>
          <h3 className="card-title">E-Rickshaw Route</h3>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">Add E-Rickshaw Route</h5>
              </div>
              {isSubmitted && <SuccessPopup isVisible={isVisible} onClose={handleClosePopup} />} {/* Popup shows on submission */}
              <form>
              <div className="card-body">
                <div className="row gx-3">
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a1">Starting Point</label>
                      <input type="text" className="form-control" id="start_point" onChange={handleInputChange} placeholder="Enter Starting Point" />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-4 col-12">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="a2">End Point</label>
                      <input type="text" className="form-control" id="end_point" onChange={handleInputChange} placeholder="Enter End Point" />
                    </div>
                  </div>
                </div>
                {/* Row ends */}
              </div>
              <div className="card-footer">
                <div className="d-flex gap-2 justify-content-end">
                  <button type="button" className="btn btn-outline-secondary">Cancel</button>
                  <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title">E-Rickshaw Route List</h5>
              </div>
              <div className="card-body">
              <div class="table-responsive">
                    <table id="customButtons" class="table table-bordered align-middle truncate m-0">
                        <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Start Point</th>
                              <th>End Point</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {routes.map((user, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{user.start_point}</td>
                            <td>{user.end_point}</td>
                            <td>{(new Date(user.createdAt).toLocaleDateString())}</td>
                            <td>
                            <button type="button" class="btn btn-outline-success" data-bs-toggle="tooltip"
                            data-bs-placement="top" data-bs-custom-class="custom-tooltip-success"
                            data-bs-title="This top tooltip is themed via CSS variables." onClick={() => handleShow(user._id)}>
                            <i class="icon-eye"></i>
                          </button>&nbsp;&nbsp;&nbsp;
                              <button type="button" class="btn btn-outline-success" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip-success" data-bs-title="This top tooltip is themed via CSS variables.">
                        <i class="icon-layers"></i>
                      </button>&nbsp;&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip-danger" data-bs-title="Delete Route">
                        <i class="icon-trash-2"></i>
                      </button>&nbsp;&nbsp;&nbsp;
                      <button type="button" class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip-danger" data-bs-title="Delete Route">
                        <i class="icon-clear"></i>
                      </button></td>
                            
                          </tr>
                        ))} 
                        </tbody>
                    </table>
                    <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Routes Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {loading ? (
                      <p>Loading...</p>
                    ) : selectedData ? (
                      <div>

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
                {/* Row ends */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}
export default Routes_path;
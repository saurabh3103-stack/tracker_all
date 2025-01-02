import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Brandcrump from '../../../Component/Brandcrump';
import GetTable from '../Table/GetTable';
import { Modal, Button } from 'react-bootstrap';

function Routes_path() {

  const API_URL = 'http://localhost:3002/api/userPath';
const API_KEY = 'your_secret_key';
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Dynamically generates serial numbers
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Start Point',
      selector: (row) => row.starting_point || row.start_point, // Handles both `starting_point` and `start_point` keys
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'End Point',
      selector: (row) => row.end_point,
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Date',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(), // Formats the created date
      sortable: false,
      style: { fontSize: '1rem', textAlign: 'center' },
    },
    {
      name: 'Status',
      selector: (row) => (
        <div>
          {row.status === 0 ? (
            <button type="button" className="btn btn-sm btn-success mr-1">
              Active
            </button>
          ) : (
            <button type="button" className="btn btn-sm btn-danger">
              Inactive
            </button>
          )}
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div>
          <button type="button" className="btn btn-sm btn-info me-1" onClick={() => handleShow(row._id)}>View</button>
          
        </div>
      ),
      sortable: false,
    },
  ];

  const [modals, setModals] = useState({
      view: false,
      
    });
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');
    const [selectedData, setSelectedData] = useState(null);



    const handleModalToggle = (modal) => {
      setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
    };
  
  const handleShow = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, { headers: { 'x-api-key': API_KEY } });
      setSelectedData(response.data);
      handleModalToggle('view');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'http://localhost:3002/api/userPath/',
        {
          headers: {
            'x-api-key': 'your_secret_key',
          },
        },
      );
      console.log(response.data); // Check the structure of the API response
      setRoutes(response.data); // Ensure data is set correctly
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-main-body">
        <Brandcrump
          pageName="Dashboard"
          title="E-Rickshaw Route"
          url="/dashboard"
          breadcrumb="E-Rickshaw Route"
        />

        {/* Route List */}
        <div className="row gx-3">
          <div className="col-sm-12">
            <div className="card mb-3">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title text-light m-0">
                  E-Rickshaw Route List
                </h5>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>{error}</p> // Display error if there is one
                ) : (
                  <div className="table-responsive">
                    <GetTable
                      data={routes}
                      columns={columns}
                      title="E-Rickshaw Routes"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={modals.view} onHide={() => handleModalToggle('view')} centered>
          <Modal.Header closeButton className="bg-info">
            <Modal.Title className="text-light"><h6 className="h6">Route Details</h6></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedData ? (
              <>
                <p><strong>Start Point:</strong> {selectedData.start_point}</p>
                <p><strong>End Point:</strong> {selectedData.end_point}</p>
                <p><strong>Date:</strong> {new Date(selectedData.createdAt).toLocaleDateString()}</p>
              </>
            ) : (
              <p>No route details available.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleModalToggle('view')}>Close</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Routes_path;

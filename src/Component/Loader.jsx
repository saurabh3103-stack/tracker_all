import React from 'react';
import loader from '../assets/loader.gif';

const Loader = () => {
  return (
    <>
    {/* <div className="loader-container">
        <img src={loader} alt="Loading..." className="loader-image img-fluid"  />
    </div> */}
    <div class="d-flex loader-container align-items-center">
      <div class="spinner-border text-success me-2" role="status" aria-hidden="true"></div>
        <strong>Loading...</strong>
    </div>
    </>
  );
};

export default Loader;

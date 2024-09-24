import React from 'react';
import logo from '../assets/logo-sm.svg';
import user from '../assets/user3.png';
function Navbar() {
  const handleLogout = () => {
    // Remove the session from localStorage
    localStorage.removeItem('session');
    navigate('/login'); // Or alternatively: navigate('/login');
  };
  return (
    <>
      <div class="app-header d-flex align-items-center">
        <div class="d-flex">
          <button class="btn btn-outline-success toggle-sidebar" id="toggle-sidebar">
            <i class="icon-menu"></i>
          </button>
          <button class="btn btn-outline-success pin-sidebar" id="pin-sidebar">
            <i class="icon-menu"></i>
          </button>
        </div>
        <div class="app-brand-sm d-md-none d-sm-block">
          <a href="index.html">
            <img src={logo} class="logo" alt="Bootstrap Gallery"/>
          </a>
        </div>
        <div class="search-container d-lg-block d-none mx-3">
          
        </div>
        <div class="header-actions">
          <div class="d-md-flex d-none">
            {/* <div class="dropdown">
              <a class="dropdown-toggle d-flex p-3 position-relative" href="#!" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="icon-twitch fs-4 lh-1 text-secondary"></i>
                <span class="count rounded-circle bg-danger">5</span>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-md shadow-sm">
                <h5 class="fw-semibold px-3 py-2 m-0">Notifications</h5>
                <a href="javascript:void(0)" class="dropdown-item">
                  <div class="d-flex align-items-start py-2">
                    <img src="assets/images/user.png" class="img-3x me-3 rounded-3" alt="Admin Themes" />
                    <div class="m-0">
                      <h6 class="mb-1 fw-semibold">Sophie Michiels</h6>
                      <p class="mb-1 text-secondary">
                        Membership has been ended.
                      </p>
                      <p class="small m-0 text-secondary opacity-50">
                        Today, 07:30pm
                      </p>
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0)" class="dropdown-item">
                  <div class="d-flex align-items-start py-2">
                    <img src="assets/images/user2.png" class="img-3x me-3 rounded-3" alt="Admin Theme" />
                    <div class="m-0">
                      <h6 class="mb-1 fw-semibold">Sophie Michiels</h6>
                      <p class="mb-1 text-secondary">
                        Congratulate, James for new job.
                      </p>
                      <p class="small m-0 text-secondary opacity-50">
                        Today, 08:00pm
                      </p>
                    </div>
                  </div>
                </a>
                <a href="javascript:void(0)" class="dropdown-item">
                  <div class="d-flex align-items-start py-2">
                    <img src="assets/images/user1.png" class="img-3x me-3 rounded-3" alt="Admin Theme" />
                    <div class="m-0">
                      <h6 class="mb-1 fw-semibold">Sophie Michiels</h6>
                      <p class="mb-1 text-secondary">
                        Lewis added new schedule release.
                      </p>
                      <p class="small m-0 text-secondary opacity-50">
                        Today, 09:30pm
                      </p>
                    </div>
                  </div>
                </a>
                <div class="d-grid p-3 border-top">
                  <a href="javascript:void(0)" class="btn btn-outline-primary">View all</a>
                </div>
              </div>
            </div> */}
          </div>
          <div class="dropdown ms-2">
            <a class="dropdown-toggle d-flex align-items-center user-settings" href="#!" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <span>Admin</span>
              <img src={user} class="img-3x m-2 me-0 rounded-3" alt="User Avatar" />
            </a>
            <div class="dropdown-menu dropdown-menu-end dropdown-menu-sm shadow-sm gap-3">
              <a class="dropdown-item d-flex align-items-center py-2" href="javascript:void(0s)"><i
                  class="icon-user fs-4 me-3"></i>User Profile</a>
              <a class="dropdown-item d-flex align-items-center py-2" href="javascript:void(0)"><i
                  class="icon-log-out fs-4 me-3" onClick={handleLogout}></i>Logout</a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Navbar

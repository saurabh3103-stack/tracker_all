import React, { useState } from 'react';
import logo from '../assets/Kanpur_Police.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  const toggleDropdown = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Remove the session from localStorage
    localStorage.removeItem('session');
    navigate('/login');
  };

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div className="app-brand px-3 py-2 d-flex align-items-center">
        <Link to="dashboard">
          <img src={logo} className="logo" alt="Bootstrap Gallery" />
        </Link>
      </div>
      <div className="sidebarMenuScroll">
        <ul className="sidebar-menu">
          <li>
            <NavLink to="dashboard">
              <i className="icon-home"></i>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li className={`treeview ${isVehicleOpen ? 'menu-open' : ''}`}>
            <a href="javascript:void(0)" onClick={() => toggleDropdown(setIsVehicleOpen)}>
              <i className="icon-local_taxi"></i>
              <span className="menu-text">Vehicle</span>
            </a>
            <ul className={`treeview-menu ${isVehicleOpen ? 'd-block' : 'd-none'}`}>
              <li><NavLink to="/vehicle">Vehicle</NavLink></li>
              <li><NavLink to="/add_vehicle">Add Vehicle</NavLink></li>
            </ul>
          </li>
          <li className={`treeview ${isUsersOpen ? 'menu-open' : ''}`}>
            <a href="javascript:void(0)" onClick={() => toggleDropdown(setIsUsersOpen)}>
              <i className="icon-user"></i>
              <span className="menu-text">App Users</span>
            </a>
            <ul className={`treeview-menu ${isUsersOpen ? 'd-block' : 'd-none'}`}>
              <li><NavLink to="/users">Users</NavLink></li>
              <li><NavLink to="/add_user">Add User</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to="route">
              <i className="icon-pie-chart"></i>
              <span className="menu-text">Master Route</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="javascript:void(0)">
              <i className="icon-file"></i>
              <span className="menu-text">Reports</span>
            </NavLink>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <i className="icon-power"></i>
              <span className="menu-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;

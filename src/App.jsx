import { useState, useEffect } from 'react';
import '../public/css/main.min.css';
import '../public/vendor/overlay-scroll/OverlayScrollbars.min.css';
import '../public/vendor/toastify/toastify.css';
import '../public/fonts/icomoon/style.css';
import './App.css';

// Components
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import Dashboard from './Component/Dashboard';
import Adduser from './Component/Adduser';
import Footer from './Component/Footer';
import Routes_path from './Component/Routes_path';
import Users from './Component/User';
import Preview from './Component/Preview';
import Loader from './Component/Loader';
import Login from './Component/Login';

// React Router imports
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'; 

function AppContent() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is logged in by checking session/localStorage
  useEffect(() => {
    const session = localStorage.getItem('session'); // Retrieve session
    if (!session && location.pathname !== '/login') {
      // Redirect to login if not logged in and not already on login page
      navigate('/login');
    }
  }, [navigate, location]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="page-wrapper"> 
      <div className="main-container"> 
        <Sidebar />
        <div className="app-container">
          <Navbar />
          <div className="app-body">
            {loading && <Loader />}
            {!loading && (
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add_vehicle' element={<Adduser />} />
                <Route path='/route' element={<Routes_path />} />
                <Route path='/vehicle' element={<Users />} />
                <Route path="/preview/:userId/:status" element={<Preview />} />
              </Routes>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;

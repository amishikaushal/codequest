import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import supabase from '../utils/supabaseClient';
import './ProfileDropdown.css';

const ProfileDropdown = ({ setIsLoggedIn, isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (!confirmLogout) return;

    await supabase.auth.signOut();
    toast.success("Logged out successfully! 🚀");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="profile-dropdown">
      <div className="dropdown-menu">
        <Link to="/edit-profile" className="dropdown-item">
          <i className="fas fa-user-edit"></i> Edit Profile
        </Link>
        <Link to="/help-support" className="dropdown-item">
          <i className="fas fa-question-circle"></i> Help & Support
        </Link>
        <button onClick={handleLogout} className="dropdown-item logout">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
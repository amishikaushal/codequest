import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { FaUserCircle } from "react-icons/fa";
import supabase from "../utils/supabaseClient"; // Supabase client
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('email');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <div className="logo" onClick={() => navigate("/")}>
          🏆 Omega
        </div>
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-middle">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/challenges">Challenges</Link></li>
          <li><Link to="/mentor">Mentorship</Link></li>
        </ul>
      </div>

      {/* Right: Auth Buttons or Profile */}
      <div className="navbar-right">
        {user ? (
          <div className="profile-section" ref={dropdownRef}>
            <button 
              className="profile-icon"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle size={28} className="user-icon" />
            </button>
            <ProfileDropdown 
              setIsLoggedIn={setIsLoggedIn}
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")} className="signup-btn">Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

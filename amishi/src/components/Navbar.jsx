import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import supabase from "../utils/supabaseClient"; // Supabase client
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
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
          <button className="profile-section" onClick={() => navigate("/profile")}>
            <FaUserCircle size={28} className="user-icon" />
          </button>
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

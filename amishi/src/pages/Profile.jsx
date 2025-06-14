import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toastify
import supabase from "../utils/supabaseClient";
import "./Profile.css"; 

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Dummy user data for now
  const user = {
    username: "amishiii005",
    rank: "584,809",
    totalSolved: 200,
    easySolved: 86,
    mediumSolved: 95,
    hardSolved: 19,
    badges: 1,
    recentBadge: "50 Days Badge 2025",
    totalSubmissions: 299,
    activeDays: 72,
    maxStreak: 40,
    recentProblems: ["01 Matrix", "Flood Fill", "Rotting Oranges", "Number of Provinces"],
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (!confirmLogout) return;

    await supabase.auth.signOut();
    toast.success("Logged out successfully! 🚀"); // ✅ Toast notification
    setIsLoggedIn(false); // Update auth state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <h2>{user.username}</h2>
        <p>Rank: <strong>{user.rank}</strong></p>
        <Link to="/edit-profile" className="edit-profile-btn">Edit Profile</Link>

        {/* Community Stats */}
        <div className="stats">
          <h3>Community Stats</h3>
          <p><strong>Views:</strong> 0</p>
          <p><strong>Solution:</strong> 0</p>
          <p><strong>Discuss:</strong> 0</p>
          <p><strong>Reputation:</strong> 0</p>
        </div>

        {/* Skills */}
        <div className="skills">
          <h3>Skills</h3>
          <p>Advanced: Dynamic Programming, Monotonic Stack, Divide & Conquer</p>
        </div>

        {/* Logout Button at Bottom */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Solved Stats */}
        <div className="stats-box">
          <h3>{user.totalSolved} / 3505 Solved</h3>
          <p>Easy: {user.easySolved} | Medium: {user.mediumSolved} | Hard: {user.hardSolved}</p>
        </div>

        {/* Badges */}
        <div className="badges-box">
          <h3>Badges Earned</h3>
          <p>{user.badges} Badge(s)</p>
          <p>Most Recent: {user.recentBadge}</p>
        </div>

        {/* Submission History */}
        <div className="submission-history">
          <h3>{user.totalSubmissions} Submissions in the past year</h3>
          <p>Total Active Days: {user.activeDays} | Max Streak: {user.maxStreak}</p>

          <h4 className="recent-problems-title">Recent Problems:</h4>
          <ul>
            {user.recentProblems.map((problem, index) => (
              <li key={index}>{problem}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

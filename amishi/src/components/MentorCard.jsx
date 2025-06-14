import React from "react";
import "./MentorCard.css";

const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card">
      <h3>{mentor.name}</h3>
      <p><strong>Expertise:</strong> {mentor.expertise.join(", ")}</p>
      <p><strong>Experience:</strong> {mentor.experience}</p>
      <p><strong>Rating:</strong> ⭐ {mentor.rating}</p>
      <button className="connect-btn">Connect</button>
    </div>
  );
};

export default MentorCard;

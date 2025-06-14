import React from "react";
import "./Leaderboard.css";

const Leaderboard = ({ scores }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard 🏆</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {index + 1}. {score.user} - {score.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

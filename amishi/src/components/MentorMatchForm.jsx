import React, { useState } from "react";
import "./MentorMatchForm.css"; 

const MentorMatchForm = ({ onSearch }) => {
  const [learningGoals, setLearningGoals] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalsArray = learningGoals.split(",").map((goal) => goal.trim());
    onSearch(goalsArray);
  };

  return (
    <div className="mentor-match-form">
      <h2>🔍 Find a Mentor</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="goals">What do you want to learn?</label>
        <input
          type="text"
          id="goals"
          placeholder="e.g., React, DSA, Python"
          value={learningGoals}
          onChange={(e) => setLearningGoals(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default MentorMatchForm;


import React from "react";

const Flashcard = ({ card, onStatusChange }) => {
  const statuses = ["new", "learning", "mastered"];

  return (
    <div className="flashcard">
      <h3>{card.question}</h3>
      <p><strong>Answer:</strong> {card.answer}</p>
      <p><small>Topic: {card.topic}</small></p>
      <div>
        <label>Status: </label>
        <select
          value={card.status}
          onChange={(e) => onStatusChange(card._id, e.target.value)}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Flashcard;

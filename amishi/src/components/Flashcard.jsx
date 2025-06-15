import React from "react";


const Flashcard = ({ card, onStatusChange }) => {
  const handleClick = () => {
    const newStatus = card.status === "learned" ? "repeat" : "learned";
    onStatusChange(card._id, newStatus);
  };

  return (
    <div className={`flashcard ${card.status}`}>
      <h3>{card.question}</h3>
      <p><strong>Topic:</strong> {card.topic}</p>
      <details><summary>Answer</summary><p>{card.answer}</p></details>
      <button onClick={handleClick}>
        Mark as {card.status === "learned" ? "Repeat" : "Learned"}
      </button>
    </div>
  );
};

export default Flashcard;

import React from "react";
import "./ChallengeCard.css";

const ChallengeCard = ({ challenge, completeChallenge, completed }) => {
  return (
    <div className={`challenge-card ${completed ? "completed" : ""}`}>
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
      <button onClick={() => completeChallenge(challenge.id)} disabled={completed}>
        {completed ? "Completed " : "Complete Challenge"}
      </button>
    </div>
  );
};

export default ChallengeCard;

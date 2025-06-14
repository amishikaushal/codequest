import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DailyChallenge.css";

const challenges = [
  { id: 1, title: "Reverse a String", description: "Write a function to reverse a given string." },
  { id: 2, title: "Two Sum", description: "Find two numbers that add up to a target value." },
  { id: 3, title: "Binary Search", description: "Implement binary search on a sorted array." },
];

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedChallenge = JSON.parse(localStorage.getItem("dailyChallenge"));
    const lastUpdated = localStorage.getItem("challengeDate");

    if (!storedChallenge || lastUpdated !== today) {
      const newChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      localStorage.setItem("dailyChallenge", JSON.stringify(newChallenge));
      localStorage.setItem("challengeDate", today);
      setChallenge(newChallenge);
    } else {
      setChallenge(storedChallenge);
    }

    setLoading(false);
  }, []);

  return (
    <div className="daily-challenge-section">
      <h2>Daily Challenge</h2>

      {/* Question Section */}
      <div className="question-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          challenge && (
            <>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <Link to={`/solve/${challenge.id}`} className="solve-btn">
                Solve Now
              </Link>
            </>
          )
        )}
      </div>

      {/* Calendar Section */}
      <div className="calendar-container">
        <Calendar
          value={date}
          onChange={setDate}
          tileClassName={({ date }) =>
            date.toDateString() === new Date().toDateString() ? "current-day" : ""
          }
        />
      </div>
    </div>
  );
};

export default DailyChallenge;

import React, { useState } from "react";
import TopPlayers from "../components/TopPlayers";
import "./LeaderBoard.css";

const personalLeaderboard = [
  { rank: 1, name: "You", score: 870 },
  { rank: 2, name: "John Doe", score: 850 },
  { rank: 3, name: "Jane Smith", score: 820 },
];

const contests = [
  { title: "⚡ Weekly Coding Challenge", level: "Intermediate", participants: 120 },
  { title: "🚀 AI Hackathon", level: "Advanced", participants: 90 },
  { title: "🎯 Beginner's Algorithm Contest", level: "Beginner", participants: 150 },
];

// Utility to normalize titles (remove emojis and trim spaces)
const normalize = (str) => str.replace(/[^\w\s]/gi, "").trim().toLowerCase();

const Leaderboard = () => {
  const [selectedContest, setSelectedContest] = useState(null);
  const [contestQuestions, setContestQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoinNow = async (contestTitle) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5050/api/challenges/${encodeURIComponent(contestTitle)}`);
      if (!response.ok) throw new Error("Failed to fetch contest questions");

      const data = await response.json();
      console.log("Fetched contest:", contestTitle);
      console.log("Questions:", data);

      setSelectedContest(contestTitle);
      setContestQuestions(data);
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Could not load questions. Please try again.");
      setContestQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>🏆 Leaderboard</h1>

      <div className="leaderboard-content">
        {/* Left Side */}
        <div className="leaderboards-section">
          <div className="leaderboard-box">
            <TopPlayers />
          </div>

          <div className="leaderboard-box">
            <h2 style={{ color: "#6200ea" }}>🌟 Personalized Leaderboard</h2>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {personalLeaderboard.map((player, index) => (
                  <tr key={index}>
                    <td>{player.rank}</td>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                    <td><button className="connect-btn">Connect</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side */}
        <div className="contests-section">
          <h2 style={{ color: "#6200ea" }}>🚀 Contests & Competitions</h2>
          {contests.map((contest, index) => (
            <div key={index} className="contest-card">
              <h3>{contest.title}</h3>
              <p>Level: <strong>{contest.level}</strong></p>
              <p>Participants: <strong>{contest.participants}</strong></p>
              <button className="join-btn" onClick={() => handleJoinNow(contest.title)}>
                Join Now
              </button>

              {selectedContest && normalize(selectedContest) === normalize(contest.title) && (
                <div className="question-list">
                  <h4>📌 Questions in {contest.title}</h4>
                  {loading ? (
                    <p>Loading questions...</p>
                  ) : error ? (
                    <p className="error">{error}</p>
                  ) : contestQuestions.length === 0 ? (
                    <p>No questions available.</p>
                  ) : (
                    contestQuestions.map((q) => (
                      <div key={q._id} className="question-card">
                        <h5>{q.title}</h5>
                        <p><strong>Difficulty:</strong> {q.difficulty}</p>
                        <p>{q.description}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Challenges.css";
import { PieChart } from '@mui/x-charts/PieChart';

const API_URL = "http://localhost:5050/api";
const CHALLENGES_PER_PAGE = 10;

const getDateString = () => {
  return new Date().toISOString().split('T')[0];
};

const getRandomChallenge = (challenges) => {
  if (!challenges || challenges.length === 0) return null;
  
  // Get today's date string to use as seed
  const dateStr = getDateString();
  
  // Create a seeded random number based on the date
  let seedValue = Array.from(dateStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seededRandom = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };
  
  // Use the seeded random to get today's challenge
  const index = Math.floor(seededRandom() * challenges.length);
  return challenges[index];
};

const ChallengesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedLevel = new URLSearchParams(location.search).get("level");

  const [challenges, setChallenges] = useState([]);
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Authentication check
  useEffect(() => {
    if (!localStorage.getItem("email")) navigate("/login");
  }, [navigate]);

  // Load challenge and progress data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const challUrl = selectedLevel
          ? `${API_URL}/challenges/difficulty/${selectedLevel}`
          : `${API_URL}/challenges`;

        const [challRes, email] = await Promise.all([
          fetch(challUrl),
          localStorage.getItem("email"),
        ]);

        if (!challRes.ok) throw new Error("Failed to fetch challenges");
        const challData = await challRes.json();

        const progRes = await fetch(`${API_URL}/users/progress/${email}`);
        if (!progRes.ok) throw new Error("Failed to fetch user progress");
        const progData = await progRes.json();

        const solvedSet = new Set(progData.solvedQuestions || []);
        const enrichedChallenges = challData.map((c) => ({
          ...c,
          completed: solvedSet.has(c._id),
        }));

        // Get daily challenge using the seeded random function
        const dailyChallenge = getRandomChallenge(enrichedChallenges);
        
        // Remove the daily challenge from the main list to avoid duplication
        const remainingChallenges = enrichedChallenges.filter(
          c => c._id !== dailyChallenge._id
        );

        setChallenges([dailyChallenge, ...remainingChallenges]);
        setUserProgress(
          progData.progress || {
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
          }
        );
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedLevel]);

  const handleCheckboxChange = async (id, currentStatus) => {
    try {
      setChallenges((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, completed: !currentStatus } : c
        )
      );

      const email = localStorage.getItem("email");

      const res = await fetch(`${API_URL}/users/solve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, questionId: id, value: !currentStatus }),
      });
      if (!res.ok) throw new Error("User solve update failed");

      const progRes = await fetch(`${API_URL}/users/progress/${email}`);
      if (!progRes.ok) throw new Error("Failed to fetch updated progress");
      const progData = await progRes.json();

      setUserProgress(
        progData.progress || {
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
        }
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update progress");
    }
  };

  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>{error}</div>;

  // Pagination logic excluding the first (Today's) challenge
  const restChallenges = challenges.slice(1);
  const totalPages = Math.ceil(restChallenges.length / CHALLENGES_PER_PAGE);
  const paginated = restChallenges.slice(
    (currentPage - 1) * CHALLENGES_PER_PAGE,
    currentPage * CHALLENGES_PER_PAGE
  );

  const todayChallenge = challenges[0];

  return (
    <div className="challenges-page">
      <div className="left-section">
        {/* Daily Challenge */}
        {todayChallenge && (
          <div className="daily-challenge">
            <h2>Today's Challenge: {todayChallenge.title || todayChallenge.name}</h2>
            <button onClick={() => navigate(`/challenge/${todayChallenge._id}`)}>
              Start Challenge
            </button>
          </div>
        )}

        {/* Challenge List */}
        <div className="previous-challenges">
          <h2>
            {selectedLevel
              ? `${selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Challenges`
              : "All Challenges"}
          </h2>

          {restChallenges.length === 0 ? (
            <p>No additional challenges available.</p>
          ) : (
            <>
              <table className="challenge-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={c.completed}
                          onChange={() =>
                            handleCheckboxChange(c._id, c.completed)
                          }
                        />
                      </td>
                      <td>{c.name || c.title}</td>
                      <td>{c.difficulty}</td>
                      <td>
                        <button
                          onClick={() =>
                            window.open(c.links?.leetcode || c.links?.gfg, "_blank")
                          }
                          disabled={!c.links}
                        >
                          {c.completed ? "Solve Again" : "Solve"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* User Progress Pie Chart */}
      <div className="right-section">
        <div className="user-progress">
          <h2>📊 Your Progress</h2>
          {userProgress ? (
            <div>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: userProgress.easySolved, label: 'Easy', color: '#82ca9d' },
                      { id: 1, value: userProgress.mediumSolved, label: 'Medium', color: '#8884d8' },
                      { id: 2, value: userProgress.hardSolved, label: 'Hard', color: '#ff8042' }
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  }
                ]}
                width={300}
                height={300}
                margin={{ right: 0, left: 0, top: 10, bottom: 10 }}
              />
              <div className="stats-summary">
                <div className="stat-item">
                  <span style={{ color: '#82ca9d' }}>●</span> Easy: {userProgress.easySolved} solved
                  ({((userProgress.easySolved / (userProgress.easySolved + userProgress.mediumSolved + userProgress.hardSolved)) * 100).toFixed(1)}%)
                </div>
                <div className="stat-item">
                  <span style={{ color: '#8884d8' }}>●</span> Medium: {userProgress.mediumSolved} solved
                  ({((userProgress.mediumSolved / (userProgress.easySolved + userProgress.mediumSolved + userProgress.hardSolved)) * 100).toFixed(1)}%)
                </div>
                <div className="stat-item">
                  <span style={{ color: '#ff8042' }}>●</span> Hard: {userProgress.hardSolved} solved
                  ({((userProgress.hardSolved / (userProgress.easySolved + userProgress.mediumSolved + userProgress.hardSolved)) * 100).toFixed(1)}%)
                </div>
              </div>
            </div>
          ) : (
            <p>Loading stats...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;

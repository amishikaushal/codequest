import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Challenges.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = "http://localhost:5050/api";
const CHALLENGES_PER_PAGE = 10;

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

        setChallenges(enrichedChallenges);
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
      <div className="right-section" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="user-progress">
          <h2>📊 Your Progress</h2>
          {userProgress ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Easy", value: userProgress.easySolved },
                    { name: "Medium", value: userProgress.mediumSolved },
                    { name: "Hard", value: userProgress.hardSolved },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  <Cell fill="#82ca9d" />
                  <Cell fill="#8884d8" />
                  <Cell fill="#ff8042" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>Loading stats...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;

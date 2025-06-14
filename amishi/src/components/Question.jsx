// src/components/Question.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";  // Optional: If you have table-specific styles

const Question = () => {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const challengesPerPage = 10;

  // Fetch the challenges data from the API
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/challenges");
        if (!response.ok) throw new Error("Failed to fetch challenges");

        const data = await response.json();
        setChallenges(data);
        setCurrentPage(1); // Reset to page 1 on data load
      } catch (err) {
        setError("Failed to fetch challenges.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const totalPages = Math.ceil(challenges.length / challengesPerPage);
  const paginatedChallenges = challenges.slice(
    (currentPage - 1) * challengesPerPage,
    currentPage * challengesPerPage
  );

  // Pagination logic
  const handlePagination = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="question-container">
      <h2>Select a Challenge</h2>

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
          {paginatedChallenges.map((challenge) => (
            <tr key={challenge._id}>
              <td>{challenge.completed ? "✅" : "❌"}</td>
              <td>{challenge.title}</td>
              <td>{challenge.difficulty}</td>
              <td>
                <button onClick={() => navigate(`/challenge/${challenge._id}`)}>
                  {challenge.completed ? "Solve Again" : "Solve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePagination("prev")} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePagination("next")} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;

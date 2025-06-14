import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SolveQuestion.css";

const questions = [
  { id: 1, title: "Reverse a String", description: "Write a function to reverse a given string." },
  { id: 2, title: "Two Sum", description: "Find two numbers that add up to a target value." },
  { id: 3, title: "Binary Search", description: "Implement binary search on a sorted array." },
];

const SolveQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedQuestion = questions.find(q => q.id === parseInt(id));
    if (selectedQuestion) setQuestion(selectedQuestion);
    setLoading(false);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!question) return <p>Question not found.</p>;

  return (
    <div className="solve-page">
      {/* Left: Problem Statement */}
      <div className="problem-section">
        <h2>{question.title}</h2>
        <p>{question.description}</p>
      </div>

      {/* Right: Code Editor */}
      <div className="editor-section">
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your solution here..."
        />
        <div className="button-container">
          <button className="run-btn">Run</button>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default SolveQuestion;

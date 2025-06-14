import React from "react";
import { useParams, Link } from "react-router-dom";
import "./QuestionDetail.css";

const questionData = {
  1: { 
    title: "Two Sum", 
    description: "Given an array of integers, return indices of two numbers that add up to a target." 
  },
  2: { 
    title: "Longest Substring Without Repeating Characters", 
    description: "Find the length of the longest substring without repeating characters." 
  },
  3: { 
    title: "Merge K Sorted Lists", 
    description: "Merge k sorted linked lists and return one sorted list." 
  },
};

const QuestionDetail = () => {
  const { id } = useParams();
  const question = questionData[id];

  if (!question) return <h2>Question not found!</h2>;

  return (
    <div className="question-detail-container">
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      
      {/* Buttons for navigation */}
      <div className="buttons">
        <Link to="/questions" className="back-button">⬅ Back to Questions</Link>
        <button className="solve-button">Solve</button>
      </div>
    </div>
  );
};

export default QuestionDetail;

import { useNavigate } from "react-router-dom";
import "./Home.css";
import DailyChallengeCalendar from "../components/DailyChallengeCalendar";

import { useState } from "react";
import Flashcards from "../components/Flashcards";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  const usefulLinks = {
    Beginner: [
      { title: "GeeksforGeeks Basics", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" },
      { title: "FreeCodeCamp JavaScript", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
      { title: "LeetCode Easy Problems", url: "https://leetcode.com/problemset/?difficulty=Easy" },
    ],
    Intermediate: [
      { title: "CS50 by Harvard", url: "https://cs50.harvard.edu/x/" },
      { title: "NeetCode 150", url: "https://neetcode.io/" },
      { title: "LeetCode Medium Problems", url: "https://leetcode.com/problemset/?difficulty=Medium" },
    ],
    Advanced: [
      { title: "Codeforces", url: "https://codeforces.com/" },
      { title: "Advanced DP Patterns", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
      { title: "LeetCode Hard Problems", url: "https://leetcode.com/problemset/?difficulty=Hard" },
    ],
  };

  const levelDescriptions = {
    Beginner: "Perfect for those just starting out with coding. These resources help build a solid foundation in programming and problem-solving.",
    Intermediate: "For those with basic experience. These links help deepen your understanding of data structures and algorithms.",
    Advanced: "Tackle complex problems and optimize your solutions. These resources are ideal for competitive programming and interviews.",
  };

  const handleCategoryClick = (level) => {
    setSelectedLevel(level);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedLevel("");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Welcome to <span className="highlight">CodeQuest</span>
          </h1>
          <p>Sharpen your coding skills with daily challenges and compete on leaderboards.</p>
          <button className="get-started-btn" onClick={() => navigate("/challenges")}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src="/assets/homepage-image.jpeg" alt="Coding Illustration" className="responsive-image" />
        </div>
      </section>

      {/* Featured Challenges Section */}
      <section className="featured-challenges">
        <h2>Featured Challenges</h2>
        <div className="challenge-card-total">
          <div className="challenge-card beginner" onClick={() => handleCategoryClick("Beginner")}>
            <h3>Beginner Challenges</h3>
            <p>Start with simple problems to build your confidence.</p>
          </div>
          <div className="challenge-card intermediate" onClick={() => handleCategoryClick("Intermediate")}>
            <h3>Intermediate Challenges</h3>
            <p>Take your coding skills to the next level.</p>
          </div>
          <div className="challenge-card advanced" onClick={() => handleCategoryClick("Advanced")}>
            <h3>Advanced Challenges</h3>
            <p>Face tough algorithmic problems and optimize solutions.</p>
          </div>
        </div>
      </section>

      {/* Daily Challenge Section */}
      <section className="daily-challenge-section">
        <div className="daily-content">
          <div className="flashcards-area">
            <h2>Practice Cards</h2>
            <div className="flashcards-container">
              <Flashcards />
            </div>
          </div>
          <div className="calendar-area">
            <h2>Daily Challenges</h2>
            <div className="calendar-container">
              <DailyChallengeCalendar />
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>{selectedLevel} Resources</h3>
            <p className="popup-description">{levelDescriptions[selectedLevel]}</p>
            <ul>
              {usefulLinks[selectedLevel].map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

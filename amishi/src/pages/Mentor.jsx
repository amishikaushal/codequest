import React, { useState } from "react";
import "./Mentor.css";
import MentorMatchForm from "../components/MentorMatchForm"; // Mentor search form
import MentorCard from "../components/MentorCard"; // Mentor display card

// Sample mentors list
const mentors = [
  { id: 1, name: "Alice Johnson", expertise: ["React", "DSA"], experience: "5+ years", rating: 4.8 },
  { id: 2, name: "David Smith", expertise: ["Python", "Machine Learning"], experience: "7+ years", rating: 4.9 },
  { id: 3, name: "Sophia Lee", expertise: ["C++", "Competitive Programming"], experience: "4+ years", rating: 4.7 },
];

const Mentor = () => {
  const [filteredMentors, setFilteredMentors] = useState(mentors);

  // Function to filter mentors based on learning goals
  const handleSearch = (learningGoals) => {
    const matchedMentors = mentors.filter((mentor) =>
      mentor.expertise.some((skill) => learningGoals.includes(skill))
    );
    setFilteredMentors(matchedMentors);
  };

  return (
    <div className="mentor-container">
      {/* Hero Section */}
      <section className="mentor-hero">
        <h1>Find a Mentor & Discuss</h1>
        <p>Get access to open-source DSA resources or connect with expert mentors for one-on-one guidance.</p>
      </section>

      {/* Mentor Match Form */}
      <section className="mentor-match-section">
        <MentorMatchForm onSearch={handleSearch} />
      </section>

      {/* Open-Source Resources Section */}
      <section className="resources-section">
        <h2>📚 Open-Source DSA Resources</h2>
        <ul>
          <li><a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">LeetCode - Coding Challenges</a></li>
          <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - DSA Guides</a></li>
          <li><a href="https://cs50.harvard.edu/" target="_blank" rel="noopener noreferrer">CS50 - Harvard's Intro to CS</a></li>
          <li><a href="https://www.khanacademy.org/computing/computer-science" target="_blank" rel="noopener noreferrer">Khan Academy - CS Fundamentals</a></li>
        </ul>
      </section>

      {/* Paid Mentorship Section */}
      <section className="mentorship-section">
        <h2>👨‍🏫 Get a One-on-One Mentor</h2>
        <p>Need personalized DSA training and interview prep? Get a mentor today!</p>
      </section>

      {/* Mentor Cards Display */}
      <section className="mentor-cards-section">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} />)
        ) : (
          <p>No mentors found for the selected skills.</p>
        )}
      </section>
    </div>
  );
};

export default Mentor;

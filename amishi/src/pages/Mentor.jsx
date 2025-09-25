import React, { useState } from "react";
import "./Mentor.css";
import MentorMatchForm from "../components/MentorMatchForm";
import MentorCard from "../components/MentorCard";


const mentors = [
  { id: 1, name: "Alice Johnson", expertise: ["React", "DSA"], experience: "5+ years", rating: 4.8 },
  { id: 2, name: "David Smith", expertise: ["Python", "Machine Learning"], experience: "7+ years", rating: 4.9 },
  { id: 3, name: "Sophia Lee", expertise: ["C++", "Competitive Programming"], experience: "4+ years", rating: 4.7 },
  { id: 4, name: "Raj Patel", expertise: ["JavaScript", "Node.js", "MongoDB"], experience: "6+ years", rating: 4.8 },
  { id: 5, name: "Emily Davis", expertise: ["System Design", "DSA", "Java"], experience: "8+ years", rating: 4.9 },
  { id: 6, name: "Carlos Martinez", expertise: ["Docker", "DevOps", "Linux"], experience: "5+ years", rating: 4.6 },
  { id: 7, name: "Maya Singh", expertise: ["Python", "Data Science", "SQL"], experience: "6+ years", rating: 4.9 },
  { id: 8, name: "Tomiko Tanaka", expertise: ["AI", "Deep Learning", "NLP"], experience: "7+ years", rating: 4.8 },
  { id: 9, name: "Jake Thompson", expertise: ["TypeScript", "React", "Redux"], experience: "4+ years", rating: 4.7 },
  { id: 10, name: "Nina Verma", expertise: ["Spring Boot", "Java", "Microservices"], experience: "5+ years", rating: 4.8 },
  { id: 11, name: "Omar Abdallah", expertise: ["HTML", "CSS", "Responsive Design"], experience: "3+ years", rating: 4.5 },
  { id: 12, name: "Ayesha Khan", expertise: ["Flutter", "Mobile App Dev", "Firebase"], experience: "5+ years", rating: 4.7 }
];

const Mentor = () => {
  const [filteredMentors, setFilteredMentors] = useState(mentors);


  const handleSearch = (learningGoals) => {
    const matchedMentors = mentors.filter((mentor) =>
      mentor.expertise.some((skill) => learningGoals.includes(skill))
    );
    setFilteredMentors(matchedMentors);
  };

  return (
    <div className="mentor-container">
      <section className="mentor-hero">
        <h1>Find a Mentor & Discuss</h1>
        <p>Get access to open-source DSA resources or connect with expert mentors for one-on-one guidance.</p>
      </section>

      
      <section className="mentor-match-section">
        <MentorMatchForm onSearch={handleSearch} />
      </section>

      
      <section className="resources-section">
        <h2>📚 Open-Source DSA Resources</h2>
        <ul>
          <li><a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">LeetCode - Coding Challenges</a></li>
          <li><a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">GeeksforGeeks - DSA Guides</a></li>
          <li><a href="https://cs50.harvard.edu/" target="_blank" rel="noopener noreferrer">CS50 - Harvard's Intro to CS</a></li>
          <li><a href="https://www.khanacademy.org/computing/computer-science" target="_blank" rel="noopener noreferrer">Khan Academy - CS Fundamentals</a></li>
        </ul>
      </section>

      <section className="mentorship-section">
        <h2>👨‍🏫 Get a One-on-One Mentor</h2>
        <p>Need personalized DSA training and interview prep? Get a mentor today!</p>
      </section>

     
      <section className="mentor-cards-section">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))
        ) : (
          <p>No mentors found for the selected skills.</p>
        )}
      </section>
    </div>
  );
};

export default Mentor;

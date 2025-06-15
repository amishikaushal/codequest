import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DailyChallengeCalendar.css";

const DailyChallengeCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [redeemPoints, setRedeemPoints] = useState(0);
  const navigate = useNavigate(); // React Router navigation

  function getTimeLeft() {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setHours(24, 0, 0, 0); // Reset to midnight
    return Math.floor((nextDay - now) / 1000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown time
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Dummy data for completed challenges
  const completedDays = [1, 5, 10, 15, 20];

  // Function to navigate to challenge page when a date is clicked
  const handleDayClick = (selectedDate) => {
    const challengeDate = selectedDate.getDate();
    navigate(`/challenge/${challengeDate}`); // Navigate to challenge page
  };

  return (
    <div className="calendar-container">
      <h2>Day {date.getDate()}</h2>
      <p className="timer">⏳ {formatTime(timeLeft)} left</p>

      {/* Calendar */}
      <Calendar
        value={date}
        onChange={(selectedDate) => {
          setDate(selectedDate);
          handleDayClick(selectedDate);
        }}
        tileClassName={({ date }) =>
          date.getDate() === new Date().getDate()
            ? "current-day"
            : completedDays.includes(date.getDate())
            ? "completed-day"
            : ""
        }
      />

      {/* Weekly Premium Section */}
      
    </div>
  );
};

export default DailyChallengeCalendar;

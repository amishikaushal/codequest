import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DailyChallengeCalendar.css";

const API_URL = "http://localhost:5050/api";

const DailyChallengeCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [completedDays, setCompletedDays] = useState([]);
  const navigate = useNavigate();

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

  // Check if a date is today
  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  // Fetch completed days on mount
  useEffect(() => {
    const fetchCompletedDays = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(`${API_URL}/users/completed-days/${email}`);
        if (response.ok) {
          const data = await response.json();
          setCompletedDays(data.completedDays || []);
        }
      } catch (error) {
        console.error("Error fetching completed days:", error);
      }
    };

    fetchCompletedDays();
  }, []);

  // Function to navigate to challenge page when a date is clicked
  const handleDayClick = async (selectedDate) => {
    if (isToday(selectedDate)) {
      try {
        const response = await fetch(`${API_URL}/challenges/daily`);
        if (!response.ok) throw new Error('Failed to fetch daily challenge');
        const challenge = await response.json();
        navigate(`/challenge/${challenge._id}`);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="calendar-container">
      <h2>Day {date.getDate()}</h2>
      <p className="timer">⏳ {formatTime(timeLeft)} left</p>

      <Calendar
        value={date}
        onChange={(selectedDate) => {
          setDate(selectedDate);
          handleDayClick(selectedDate);
        }}
        tileClassName={({ date }) =>
          isToday(date)
            ? "current-day"
            : completedDays.includes(date.getDate())
            ? "completed-day"
            : ""
        }
        tileDisabled={({ date }) => !isToday(date)}
      />
    </div>
  );
};

export default DailyChallengeCalendar;

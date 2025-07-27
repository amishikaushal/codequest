import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "./DailyChallengeCalendar.css";

const API_URL = "http://localhost:5050/api";

const DailyChallengeCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const navigate = useNavigate();

  function getTimeLeft() {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setHours(24, 0, 0, 0);
    return Math.floor((nextDay - now) / 1000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

 
  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const response = await fetch(`${API_URL}/challenges`);
        if (!response.ok) throw new Error("Failed to fetch challenges");
        const challenges = await response.json();
        
        const email = localStorage.getItem("email");
        const progRes = await fetch(`${API_URL}/users/progress/${email}`);
        if (!progRes.ok) throw new Error("Failed to fetch user progress");
        const progData = await progRes.json();

        const solvedSet = new Set(progData.solvedQuestions || []);
        const enrichedChallenges = challenges.map((c) => ({
          ...c,
          completed: solvedSet.has(c._id),
        }));

        // Import and use the same random challenge selection logic
        const { getRandomChallenge } = await import('../utils/dailyChallenge');
        const todayChallenge = getRandomChallenge(enrichedChallenges);
        setDailyChallenge(todayChallenge);
      } catch (error) {
        console.error("Error fetching daily challenge:", error);
      }
    };

    fetchDailyChallenge();
  }, []);

  // Format countdown time
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };


  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const handleTodayClick = () => {
    if (dailyChallenge) {
      if (dailyChallenge.links?.leetcode || dailyChallenge.links?.gfg) {
        window.open(dailyChallenge.links?.leetcode || dailyChallenge.links?.gfg, "_blank");
      } else {
        
        navigate(`/challenge/${dailyChallenge._id}`);
      }
    }
  };

  return (
    <div className="calendar-container">
      <h2>Day {date.getDate()}</h2>
      <p className="timer">⏳ {formatTime(timeLeft)} left</p>
      {dailyChallenge && (
        <div className="daily-challenge-info">
          <p>Today's Challenge: {dailyChallenge.title || dailyChallenge.name}</p>
        </div>
      )}

      <Calendar
        value={date}
        onChange={setDate}
        tileClassName={({ date }) => isToday(date) ? "current-day" : ""}
        tileDisabled={({ date }) => !isToday(date)}
        onClickDay={(value) => {
          if (isToday(value)) {
            handleTodayClick();
          }
        }}
      />
    </div>
  );
};

export default DailyChallengeCalendar;

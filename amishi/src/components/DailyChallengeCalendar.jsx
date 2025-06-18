import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DailyChallengeCalendar.css";

const DailyChallengeCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

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

  return (
    <div className="calendar-container">
      <h2>Day {date.getDate()}</h2>
      <p className="timer">⏳ {formatTime(timeLeft)} left</p>

      <Calendar
        value={date}
        onChange={setDate}
        tileClassName={({ date }) => isToday(date) ? "current-day" : ""}
        tileDisabled={({ date }) => !isToday(date)}
      />
    </div>
  );
};

export default DailyChallengeCalendar;

import React, { useState, useEffect } from "react";
import './Timer.css';

const CountdownTimer = ({ initialDays }) => {
  const [timeLeft, setTimeLeft] = useState(initialDays * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const hours = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  return (
    <div className="timer-div">
      <p className="timer-p">{timeLeft > 0 ? formatTime(timeLeft) : "Finished"}</p>
    </div>
  );
};

export default CountdownTimer;

// Usage
// <CountdownTimer initialDays={32} />

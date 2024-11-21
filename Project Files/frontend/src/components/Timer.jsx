import React, { useState, useEffect } from "react";
import './Timer.css';

const CountdownTimer = ({ auctionId, initialDays }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem(`auction_${auctionId}`);
    if (savedEndTime) {
      const remainingTime = new Date(savedEndTime).getTime() - Date.now();
      return remainingTime > 0 ? remainingTime : 0;
    }
    const endTime = Date.now() + initialDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(`auction_${auctionId}`, new Date(endTime).toISOString());
    return initialDays * 24 * 60 * 60 * 1000;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft]);

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

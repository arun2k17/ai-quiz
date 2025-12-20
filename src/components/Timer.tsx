import React, { useEffect, useState } from "react";
import { mergeStyles } from "@fluentui/react";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isExpired, setIsExpired] = useState(false);

  // Reset timer when duration changes (i.e., when question changes)
  useEffect(() => {
    setTimeLeft(duration);
    setIsExpired(false);
  }, [duration]);

  useEffect(() => {
    if (isExpired) return; // Don't start another timer if already expired

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          setIsExpired(true);
          onTimeUp();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const isWarning = timeLeft <= 30;
  const textColor = isWarning ? "#d13438" : "#107c10"; // Red if < 30 sec, green otherwise

  const timerStyles = mergeStyles({
    fontSize: "36px",
    fontWeight: "bold",
    color: textColor,
    transition: "color 0.2s ease",
  });

  return <div className={timerStyles}>⏱️ {timeString}</div>;
};

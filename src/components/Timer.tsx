import React, { useEffect, useState } from "react";
import { mergeStyles } from "@fluentui/react";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

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

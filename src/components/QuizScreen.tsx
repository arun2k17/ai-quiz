import React, { useState, useEffect } from "react";
import { PrimaryButton, Stack, Text, mergeStyles } from "@fluentui/react";
import type { Question } from "../types/quiz.ts";
import { isAnswerCorrect } from "../utils/quiz.ts";
import { Timer } from "./Timer.tsx";

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: number) => void;
  onTimeUp: () => void;
  timerDuration?: number; // in seconds, default 180 (3 minutes)
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onTimeUp,
  timerDuration = 180, // 3 minutes default
}) => {
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset feedback when question changes
  useEffect(() => {
    setInputValue("");
    setFeedback(null);
    setShowFeedback(false);
    setShowHint(false);
  }, [question.id]);

  const handleSubmit = () => {
    const answer = parseInt(inputValue, 10);

    if (isNaN(answer)) {
      setFeedback("wrong");
      setShowFeedback(true);
      return;
    }

    const isCorrect = isAnswerCorrect(question, answer);
    setFeedback(isCorrect ? "correct" : "wrong");
    setShowFeedback(true);

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      onAnswerSubmit(answer);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !showFeedback) {
      handleSubmit();
    }
  };

  const containerStyles = mergeStyles({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  });

  const cardStyles = mergeStyles({
    background: "white",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "100%",
  });

  const questionTextStyles = mergeStyles({
    fontSize: question.hint ? "20px" : "64px", // Smaller font for story problems
    fontWeight: "bold",
    color: "#333",
    margin: "20px 0",
    textAlign: question.hint ? "left" : "center", // Left-align story problems
    lineHeight: question.hint ? "1.6" : "1.2",
    whiteSpace: question.hint ? "pre-wrap" : "normal", // Allow line breaks
  });

  const feedbackStyles = mergeStyles({
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: feedback === "correct" ? "#107c10" : "#d13438",
    marginTop: "20px",
  });

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        {/* Progress */}
        <Text
          variant="medium"
          styles={{ root: { color: "#666", marginBottom: "20px" } }}
        >
          Question {questionNumber} of {totalQuestions}
        </Text>

        {/* Timer */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Timer
            key={question.id}
            duration={timerDuration}
            onTimeUp={onTimeUp}
          />
        </div>

        {/* Question */}
        <div className={questionTextStyles}>{question.question}</div>

        {/* Hint button (only for story problems) */}
        {question.hint && !showFeedback && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <PrimaryButton
              text={showHint ? "Hide Hint" : "Show Hint 💡"}
              onClick={() => setShowHint(!showHint)}
              styles={{
                root: {
                  height: "40px",
                  fontSize: "14px",
                  background: "#faa",
                },
              }}
            />
            {showHint && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#fff4e5",
                  borderRadius: "8px",
                  border: "2px solid #ffc107",
                  fontSize: "16px",
                  color: "#333",
                  textAlign: "left",
                }}
              >
                <strong>💡 Hint:</strong> {question.hint}
              </div>
            )}
          </div>
        )}

        {/* Input */}
        {!showFeedback && (
          <Stack gap={16} styles={{ root: { marginTop: "30px" } }}>
            <input
              autoFocus
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value || "")}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              style={{
                maxWidth: "250px",
                width: "100%",
                margin: "0 auto",
                display: "block",
                fontSize: "24px",
                height: "50px",
                padding: "8px 12px",
                textAlign: "center",
                border: "2px solid #0078d4",
                borderRadius: "4px",
                fontFamily: "inherit",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <PrimaryButton
                text="Submit Answer"
                onClick={handleSubmit}
                styles={{
                  root: {
                    height: "50px",
                    fontSize: "16px",
                    minWidth: "150px",
                  },
                }}
              />
            </div>
          </Stack>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={feedbackStyles}>
            {feedback === "correct" ? "✅ Correct!" : "❌ Wrong!"}
            <div style={{ fontSize: "18px", color: "#666", marginTop: "10px" }}>
              The answer is {question.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

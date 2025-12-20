import React, { useState, useEffect } from "react";
import {
  PrimaryButton,
  Stack,
  Text,
  TextField,
  mergeStyles,
} from "@fluentui/react";
import type { Question } from "../types/quiz.ts";
import { isAnswerCorrect } from "../utils/quiz.ts";
import { Timer } from "./Timer.tsx";

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (answer: number) => void;
  onTimeUp: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSubmit,
  onTimeUp,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset feedback when question changes
  useEffect(() => {
    setInputValue("");
    setFeedback(null);
    setShowFeedback(false);
  }, [question.id]);

  const handleSubmit = () => {
    const answer = parseInt(inputValue, 10);

    if (isNaN(answer)) {
      setFeedback("wrong");
      setShowFeedback(true);
      return;
    }

    const isCorrect = isAnswerCorrect(question.num1, question.num2, answer);
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
    fontSize: "64px",
    fontWeight: "bold",
    color: "#333",
    margin: "20px 0",
    textAlign: "center",
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
          <Timer duration={180} onTimeUp={onTimeUp} />
        </div>

        {/* Question */}
        <div className={questionTextStyles}>
          {question.num1} + {question.num2} = ?
        </div>

        {/* Input */}
        {!showFeedback && (
          <Stack gap={16} styles={{ root: { marginTop: "30px" } }}>
            <TextField
              autoFocus
              type="number"
              value={inputValue}
              onChange={(_, newValue) => setInputValue(newValue || "")}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              styles={{
                root: { maxWidth: "200px", margin: "0 auto" },
                field: {
                  fontSize: "24px",
                  height: "50px",
                  textAlign: "center",
                },
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
              The answer is {question.num1 + question.num2}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

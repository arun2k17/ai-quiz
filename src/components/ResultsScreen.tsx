import React from "react";
import { PrimaryButton, Stack, Text, mergeStyles } from "@fluentui/react";
import type { Question } from "../types/quiz.ts";
import { calculateScore } from "../utils/quiz.ts";

interface ResultsScreenProps {
  questions: Question[];
  onRestart: () => void;
  onRetryWrong: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  onRestart,
  onRetryWrong,
}) => {
  const { correct, total } = calculateScore(questions);
  const percentage = Math.round((correct / total) * 100);
  const wrongQuestions = questions.filter((q) => q.isCorrect === false);

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
    maxWidth: "700px",
    width: "100%",
  });

  const scoreStyles = mergeStyles({
    fontSize: "64px",
    fontWeight: "bold",
    color: percentage >= 70 ? "#107c10" : "#d13438",
    textAlign: "center",
    margin: "20px 0",
  });

  const questionCardStyles = mergeStyles({
    background: "#f5f5f5",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
    borderLeft: "4px solid",
  });

  const getEmoji = (percentage: number) => {
    if (percentage === 100) return "🌟";
    if (percentage >= 80) return "🎉";
    if (percentage >= 70) return "👍";
    if (percentage >= 50) return "💪";
    return "📚";
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Text variant="superLarge" styles={{ root: { fontSize: "48px" } }}>
            {getEmoji(percentage)} Quiz Complete!
          </Text>
        </div>

        {/* Score */}
        <div className={scoreStyles}>
          {correct} / {total}
        </div>

        <Text
          variant="xLarge"
          styles={{
            root: {
              textAlign: "center",
              fontSize: "28px",
              color: "#666",
              marginBottom: "30px",
            },
          }}
        >
          {percentage}% Correct
        </Text>

        {/* Message */}
        <Text
          variant="large"
          styles={{
            root: {
              textAlign: "center",
              fontSize: "18px",
              marginBottom: "30px",
            },
          }}
        >
          {percentage === 100 && "Perfect score! You're a math wizard! 🧙"}
          {percentage >= 80 &&
            percentage < 100 &&
            "Great job! Keep practicing!"}
          {percentage >= 70 &&
            percentage < 80 &&
            "Good work! You can do better!"}
          {percentage < 70 && "Keep practicing! You will get better! 💪"}
        </Text>

        {/* Questions Review */}
        {wrongQuestions.length > 0 && (
          <Stack
            gap={12}
            styles={{
              root: {
                marginBottom: "30px",
                maxHeight: "300px",
                overflowY: "auto",
              },
            }}
          >
            <Text
              variant="large"
              styles={{ root: { fontWeight: "bold", marginBottom: "10px" } }}
            >
              Questions to Practice:
            </Text>
            {wrongQuestions.map((q) => (
              <div
                key={q.id}
                className={questionCardStyles}
                style={{ borderLeftColor: "#d13438" }}
              >
                <Text
                  styles={{ root: { fontWeight: "bold", marginBottom: "8px" } }}
                >
                  Question {q.id}: {q.num1}{" "}
                  {q.operation === "addition"
                    ? "+"
                    : q.operation === "subtraction"
                    ? "-"
                    : "×"}{" "}
                  {q.num2}
                </Text>
                <Text styles={{ root: { color: "#666", fontSize: "14px" } }}>
                  Your answer: {q.userAnswer || "—"} | Correct answer:{" "}
                  {q.operation === "addition"
                    ? q.num1 + q.num2
                    : q.operation === "subtraction"
                    ? q.num1 - q.num2
                    : q.num1 * q.num2}
                </Text>
              </div>
            ))}
          </Stack>
        )}

        {/* All Questions Summary */}
        <Stack
          gap={12}
          styles={{
            root: {
              marginBottom: "30px",
              maxHeight: "300px",
              overflowY: "auto",
            },
          }}
        >
          <Text
            variant="large"
            styles={{ root: { fontWeight: "bold", marginBottom: "10px" } }}
          >
            All Questions:
          </Text>
          {questions.map((q) => (
            <div
              key={q.id}
              className={questionCardStyles}
              style={{ borderLeftColor: q.isCorrect ? "#107c10" : "#d13438" }}
            >
              <Text
                styles={{ root: { fontWeight: "bold", marginBottom: "8px" } }}
              >
                {q.isCorrect ? "✅" : "❌"} Question {q.id}: {q.num1}{" "}
                {q.operation === "addition"
                  ? "+"
                  : q.operation === "subtraction"
                  ? "-"
                  : "×"}{" "}
                {q.num2}
              </Text>
              <Text styles={{ root: { color: "#666", fontSize: "14px" } }}>
                Your answer: {q.userAnswer || "—"} | Correct:{" "}
                {q.operation === "addition"
                  ? q.num1 + q.num2
                  : q.operation === "subtraction"
                  ? q.num1 - q.num2
                  : q.num1 * q.num2}
              </Text>
            </div>
          ))}
        </Stack>

        {/* Buttons */}
        <Stack gap={12} styles={{ root: { marginTop: "30px" } }}>
          <PrimaryButton
            text={
              wrongQuestions.length > 0
                ? "Retry Wrong Questions"
                : "Start New Quiz"
            }
            onClick={wrongQuestions.length > 0 ? onRetryWrong : onRestart}
            styles={{
              root: {
                height: "50px",
                fontSize: "16px",
              },
            }}
          />
          {wrongQuestions.length > 0 && (
            <PrimaryButton
              text="Start New Quiz"
              onClick={onRestart}
              styles={{
                root: {
                  height: "50px",
                  fontSize: "16px",
                  background: "#666",
                },
              }}
            />
          )}
        </Stack>
      </div>
    </div>
  );
};

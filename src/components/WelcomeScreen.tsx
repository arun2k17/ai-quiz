import React from "react";
import { PrimaryButton, Stack, Text, mergeStyles } from "@fluentui/react";
import type { QuizMode } from "../types/quiz.ts";

interface WelcomeScreenProps {
  onStart: (mode: QuizMode) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const containerStyles = mergeStyles({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  });

  const contentStyles = mergeStyles({
    textAlign: "center",
    color: "white",
  });

  return (
    <div className={containerStyles}>
      <Stack styles={{ root: contentStyles }} gap={32}>
        <div>
          <Text
            variant="superLarge"
            styles={{
              root: {
                fontSize: "64px",
                fontWeight: "bold",
                marginBottom: "16px",
              },
            }}
          >
            🧮 Math Quiz
          </Text>
          <Text
            variant="xxLarge"
            styles={{ root: { fontSize: "28px", marginBottom: "24px" } }}
          >
            Ready to test your math skills?
          </Text>
          <Text
            variant="large"
            styles={{ root: { fontSize: "20px", opacity: 0.9 } }}
          >
            Choose your quiz type
          </Text>
        </div>

        <Stack
          tokens={{ childrenGap: 16 }}
          styles={{ root: { maxWidth: "500px", margin: "0 auto" } }}
        >
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <PrimaryButton
              text="➕ Addition"
              onClick={() => onStart("addition")}
              styles={{
                root: {
                  height: "70px",
                  fontSize: "20px",
                  background: "#107c10",
                  flex: 1,
                },
              }}
            />
            <PrimaryButton
              text="➖ Subtraction"
              onClick={() => onStart("subtraction")}
              styles={{
                root: {
                  height: "70px",
                  fontSize: "20px",
                  background: "#8764b8",
                  flex: 1,
                },
              }}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <PrimaryButton
              text="✖️ Multiplication"
              onClick={() => onStart("multiplication")}
              styles={{
                root: {
                  height: "70px",
                  fontSize: "20px",
                  background: "#d83b01",
                  flex: 1,
                },
              }}
            />
            <PrimaryButton
              text="📖 Story Problems"
              onClick={() => onStart("story-problems")}
              styles={{
                root: {
                  height: "70px",
                  fontSize: "20px",
                  background: "#0078d4",
                  flex: 1,
                },
              }}
            />
          </Stack>
        </Stack>

        <Text
          variant="medium"
          styles={{ root: { opacity: 0.8, fontSize: "16px" } }}
        >
          Story Problems: 5 minutes per question • Real-world scenarios 🎯
        </Text>
      </Stack>
    </div>
  );
};

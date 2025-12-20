import React from "react";
import { PrimaryButton, Stack, Text, mergeStyles } from "@fluentui/react";

interface WelcomeScreenProps {
  onStart: () => void;
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
            Ready to test your addition skills?
          </Text>
          <Text
            variant="large"
            styles={{ root: { fontSize: "20px", opacity: 0.9 } }}
          >
            10 questions • 2 minutes per question • For ages 8+
          </Text>
        </div>

        <PrimaryButton
          text="Start Quiz"
          onClick={onStart}
          styles={{
            root: {
              height: "60px",
              fontSize: "24px",
              background: "#107c10",
            },
          }}
        />

        <Text
          variant="medium"
          styles={{ root: { opacity: 0.8, fontSize: "16px" } }}
        >
          Good luck! 🎯
        </Text>
      </Stack>
    </div>
  );
};

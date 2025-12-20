import { useState } from "react";
import { initializeIcons } from "@fluentui/react";
import { WelcomeScreen } from "./components/WelcomeScreen.tsx";
import { QuizScreen } from "./components/QuizScreen.tsx";
import { ResultsScreen } from "./components/ResultsScreen.tsx";
import type { Question, QuizState } from "./types/quiz.ts";
import { generateQuizQuestions } from "./utils/quiz.ts";
import "./App.css";

// Initialize Fluent UI icons
initializeIcons();

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    status: "welcome",
  });

  const handleStartQuiz = () => {
    const newQuestions = generateQuizQuestions();
    setQuizState({
      questions: newQuestions,
      currentIndex: 0,
      status: "in-progress",
    });
  };

  const handleAnswerSubmit = (answer: number) => {
    const updatedQuestions = [...quizState.questions];
    const currentQuestion = updatedQuestions[quizState.currentIndex];

    currentQuestion.userAnswer = answer;
    currentQuestion.isCorrect =
      currentQuestion.num1 + currentQuestion.num2 === answer;

    const nextIndex = quizState.currentIndex + 1;

    if (nextIndex >= updatedQuestions.length) {
      // Quiz completed
      setQuizState({
        questions: updatedQuestions,
        currentIndex: nextIndex,
        status: "review",
      });
    } else {
      // Move to next question
      setQuizState({
        questions: updatedQuestions,
        currentIndex: nextIndex,
        status: "in-progress",
      });
    }
  };

  const handleTimeUp = () => {
    // Auto-submit with 0 as default answer when time runs out
    // This moves to next question or ends quiz if it's the last question
    handleAnswerSubmit(0);
  };

  const handleRestart = () => {
    setQuizState({
      questions: [],
      currentIndex: 0,
      status: "welcome",
    });
  };

  const handleRetryWrong = () => {
    const wrongQuestions = quizState.questions.filter(
      (q) => q.isCorrect === false
    );
    const retryQuestions: Question[] = wrongQuestions.map((q, idx) => ({
      ...q,
      id: idx + 1,
      userAnswer: null,
      isCorrect: null,
    }));

    setQuizState({
      questions: retryQuestions,
      currentIndex: 0,
      status: "in-progress",
    });
  };

  // Render screens based on status
  if (quizState.status === "welcome") {
    return <WelcomeScreen onStart={handleStartQuiz} />;
  }

  if (quizState.status === "in-progress" && quizState.questions.length > 0) {
    const currentQuestion = quizState.questions[quizState.currentIndex];
    return (
      <QuizScreen
        question={currentQuestion}
        questionNumber={quizState.currentIndex + 1}
        totalQuestions={quizState.questions.length}
        onAnswerSubmit={handleAnswerSubmit}
        onTimeUp={handleTimeUp}
        timerDuration={180}
      />
    );
  }

  if (quizState.status === "review" && quizState.questions.length > 0) {
    return (
      <ResultsScreen
        questions={quizState.questions}
        onRestart={handleRestart}
        onRetryWrong={handleRetryWrong}
      />
    );
  }

  return null;
}

export default App;

import { useState } from "react";
import { initializeIcons } from "@fluentui/react";
import { WelcomeScreen } from "./components/WelcomeScreen.tsx";
import { QuizScreen } from "./components/QuizScreen.tsx";
import { ResultsScreen } from "./components/ResultsScreen.tsx";
import type { Question, QuizState, QuizMode } from "./types/quiz.ts";
import { generateQuizQuestions, isAnswerCorrect } from "./utils/quiz.ts";
import "./App.css";

// Initialize Fluent UI icons
initializeIcons();

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    mode: "addition",
    questions: [],
    currentIndex: 0,
    status: "welcome",
  });

  const handleStartQuiz = (mode: QuizMode) => {
    const newQuestions = generateQuizQuestions(mode);
    setQuizState({
      mode,
      questions: newQuestions,
      currentIndex: 0,
      status: "in-progress",
    });
  };

  const handleAnswerSubmit = (answer: number) => {
    const updatedQuestions = [...quizState.questions];
    const currentQuestion = updatedQuestions[quizState.currentIndex];

    currentQuestion.userAnswer = answer;
    currentQuestion.isCorrect = isAnswerCorrect(currentQuestion, answer);

    const nextIndex = quizState.currentIndex + 1;

    if (nextIndex >= updatedQuestions.length) {
      // Quiz completed
      setQuizState({
        mode: quizState.mode,
        questions: updatedQuestions,
        currentIndex: nextIndex,
        status: "review",
      });
    } else {
      // Move to next question
      setQuizState({
        mode: quizState.mode,
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
      mode: "addition",
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
      userAnswer: undefined,
      isCorrect: undefined,
    }));

    setQuizState({
      mode: quizState.mode,
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
    // Story problems get 5 minutes (300s), computational gets 3 minutes (180s)
    const timerDuration = quizState.mode === "story-problems" ? 300 : 180;

    return (
      <QuizScreen
        question={currentQuestion}
        questionNumber={quizState.currentIndex + 1}
        totalQuestions={quizState.questions.length}
        onAnswerSubmit={handleAnswerSubmit}
        onTimeUp={handleTimeUp}
        timerDuration={timerDuration}
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

export interface Question {
    id: number;
    num1: number;
    num2: number;
    userAnswer: number | null;
    isCorrect: boolean | null;
}

export interface QuizState {
    questions: Question[];
    currentIndex: number;
    status: 'welcome' | 'in-progress' | 'review';
}

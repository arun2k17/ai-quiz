export type OperationType = 'addition' | 'subtraction';

export interface Question {
    id: number;
    num1: number;
    num2: number;
    operation: OperationType;
    userAnswer: number | null;
    isCorrect: boolean | null;
}

export interface QuizState {
    questions: Question[];
    currentIndex: number;
    status: 'welcome' | 'in-progress' | 'review';
    operationType: OperationType | null;
}

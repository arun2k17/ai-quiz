export type OperationType = 'addition' | 'subtraction' | 'multiplication';
export type QuizMode = 'addition' | 'subtraction' | 'multiplication' | 'story-problems';

export interface Question {
    id: number;
    question: string;        // "45 + 23 = ?" OR story text
    answer: number;          // Pre-calculated answer
    hint?: string;           // Only for story problems
    userAnswer?: number;
    isCorrect?: boolean;
}

export interface QuizState {
    mode: QuizMode;
    questions: Question[];
    currentIndex: number;
    status: 'welcome' | 'in-progress' | 'review';
}

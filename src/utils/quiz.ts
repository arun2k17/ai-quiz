import type { Question } from '../types/quiz.ts';

/**
 * Generate a random number between min and max (inclusive)
 */
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate 10 addition problems with 2-3 digit numbers
 */
export const generateQuizQuestions = (): Question[] => {
    const questions: Question[] = [];

    for (let i = 0; i < 10; i++) {
        // Random 2-3 digit numbers (10-999)
        const num1 = getRandomNumber(10, 999);
        const num2 = getRandomNumber(10, 999);

        questions.push({
            id: i + 1,
            num1,
            num2,
            userAnswer: null,
            isCorrect: null,
        });
    }

    return questions;
};

/**
 * Check if the user's answer is correct
 */
export const isAnswerCorrect = (num1: number, num2: number, userAnswer: number): boolean => {
    return num1 + num2 === userAnswer;
};

/**
 * Calculate quiz score
 */
export const calculateScore = (questions: Question[]): { correct: number; total: number } => {
    const correct = questions.filter((q) => q.isCorrect === true).length;
    return { correct, total: questions.length };
};

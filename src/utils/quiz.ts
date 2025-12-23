import type { Question, OperationType, QuizMode } from '../types/quiz.ts';
import { storyProblems } from '../data/story-problems.ts';

/**
 * Generate a random number between min and max (inclusive)
 */
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Get operation symbol for display
 */
const getOperationSymbol = (operation: OperationType): string => {
    switch (operation) {
        case 'addition': return '+';
        case 'subtraction': return '-';
        case 'multiplication': return '×';
    }
};

/**
 * Calculate answer for computational problems
 */
const calculateAnswer = (num1: number, num2: number, operation: OperationType): number => {
    switch (operation) {
        case 'addition': return num1 + num2;
        case 'subtraction': return num1 - num2;
        case 'multiplication': return num1 * num2;
    }
};

/**
 * Generate 10 quiz questions based on mode
 */
export const generateQuizQuestions = (mode: QuizMode): Question[] => {
    // Story problems mode - randomly select 10 from the problem bank
    if (mode === 'story-problems') {
        const shuffled = [...storyProblems].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 10);
    }

    // Computational mode - generate questions with operation
    const operation = mode as OperationType;
    const questions: Question[] = [];

    for (let i = 0; i < 10; i++) {
        let num1: number;
        let num2: number;

        if (operation === 'multiplication') {
            // Single-digit multiplication (1-9)
            num1 = getRandomNumber(1, 9);
            num2 = getRandomNumber(1, 9);
        } else {
            // 2-3 digit numbers for addition and subtraction
            num1 = getRandomNumber(10, 999);
            num2 = getRandomNumber(10, 999);

            // For subtraction, ensure num1 > num2 so result is positive
            if (operation === 'subtraction' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
        }

        const symbol = getOperationSymbol(operation);
        const answer = calculateAnswer(num1, num2, operation);

        questions.push({
            id: i + 1,
            question: `${num1} ${symbol} ${num2} = ?`,
            answer,
        });
    }

    return questions;
};

/**
 * Check if the user's answer is correct
 */
export const isAnswerCorrect = (question: Question, userAnswer: number): boolean => {
    return question.answer === userAnswer;
};

/**
 * Calculate quiz score
 */
export const calculateScore = (questions: Question[]): { correct: number; total: number } => {
    const correct = questions.filter((q) => q.isCorrect === true).length;
    return { correct, total: questions.length };
};

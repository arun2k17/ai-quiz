import type { Question, OperationType } from '../types/quiz.ts';

/**
 * Generate a random number between min and max (inclusive)
 */
export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate 10 quiz questions based on operation type
 */
export const generateQuizQuestions = (operation: OperationType): Question[] => {
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

        questions.push({
            id: i + 1,
            num1,
            num2,
            operation,
            userAnswer: null,
            isCorrect: null,
        });
    }

    return questions;
};

/**
 * Check if the user's answer is correct
 */
export const isAnswerCorrect = (question: Question, userAnswer: number): boolean => {
    let expectedAnswer: number;

    if (question.operation === 'addition') {
        expectedAnswer = question.num1 + question.num2;
    } else if (question.operation === 'subtraction') {
        expectedAnswer = question.num1 - question.num2;
    } else {
        // multiplication
        expectedAnswer = question.num1 * question.num2;
    }

    return expectedAnswer === userAnswer;
};

/**
 * Calculate quiz score
 */
export const calculateScore = (questions: Question[]): { correct: number; total: number } => {
    const correct = questions.filter((q) => q.isCorrect === true).length;
    return { correct, total: questions.length };
};

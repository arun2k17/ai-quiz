import type { Question } from '../types/quiz';

/**
 * Mock story problems for testing.
 * Mix of addition, subtraction, and multiplication scenarios.
 * Appropriate for 8-year-olds with real-world contexts.
 */
export const storyProblems: Question[] = [
    {
        id: 1,
        question: "Emma has 23 colorful marbles in her collection. Her brother gave her 15 more marbles for her birthday. How many marbles does Emma have now?",
        answer: 38,
        hint: "Start with Emma's 23 marbles. Add the 15 marbles her brother gave her. 23 + 15 = ?"
    },
    {
        id: 2,
        question: "A pet store had 87 fish in their big tank. They sold 34 fish to customers today. How many fish are left in the tank?",
        answer: 53,
        hint: "The store started with 87 fish. They sold 34 fish. Take away means subtract. 87 - 34 = ?"
    },
    {
        id: 3,
        question: "Maya is planting flowers in her garden. She plants 6 flowers in each row. She makes 7 rows. How many flowers did Maya plant in total?",
        answer: 42,
        hint: "Maya has 7 rows with 6 flowers in each row. To find the total, multiply. 6 × 7 = ?"
    },
    {
        id: 4,
        question: "Jake collected 45 seashells at the beach. He gave 18 seashells to his friend Sam. How many seashells does Jake have left?",
        answer: 27,
        hint: "Jake started with 45 seashells. He gave away 18 seashells. Giving away means subtract. 45 - 18 = ?"
    },
    {
        id: 5,
        question: "A bakery made 56 cupcakes in the morning and 32 cupcakes in the afternoon. How many cupcakes did they make in total?",
        answer: 88,
        hint: "Add the morning cupcakes and afternoon cupcakes together. 56 + 32 = ?"
    },
    {
        id: 6,
        question: "There are 8 boxes of crayons. Each box has 9 crayons inside. How many crayons are there altogether?",
        answer: 72,
        hint: "You have 8 boxes with 9 crayons in each. Multiply to find the total. 8 × 9 = ?"
    },
    {
        id: 7,
        question: "Lily had 64 stickers in her sticker book. She used 29 stickers to decorate her notebook. How many stickers does Lily have left?",
        answer: 35,
        hint: "Lily started with 64 stickers. She used 29 stickers. Using stickers means subtract. 64 - 29 = ?"
    },
    {
        id: 8,
        question: "A farmer has 5 baskets. He puts 8 apples in each basket. How many apples does the farmer have in all the baskets?",
        answer: 40,
        hint: "The farmer has 5 baskets with 8 apples in each. Multiply to find all the apples. 5 × 8 = ?"
    },
    {
        id: 9,
        question: "There were 92 books on the library shelf. Students checked out 47 books. How many books are still on the shelf?",
        answer: 45,
        hint: "Start with 92 books. Students took away 47 books. Subtract to find how many remain. 92 - 47 = ?"
    },
    {
        id: 10,
        question: "Tom has 38 toy cars and his cousin has 41 toy cars. How many toy cars do they have together?",
        answer: 79,
        hint: "Add Tom's 38 toy cars and his cousin's 41 toy cars together. 38 + 41 = ?"
    }
];

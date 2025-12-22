import { test, expect } from '@playwright/test';

test.describe('Math Quiz App - Full Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for page to fully load
        await page.waitForLoadState('domcontentloaded');
        // Wait for React to mount the app - wait for button element to exist
        await page.locator('button').first().waitFor({ state: 'visible', timeout: 10000 });
    });

    test('should complete full quiz flow from start to results', async ({ page }) => {
        // ===== WELCOME SCREEN =====
        // Verify welcome screen is displayed using more robust selectors
        // Wait for button to be visible (it's the most reliable element)
        const additionButton = page.locator('button').filter({ hasText: /Addition/i });
        await expect(additionButton).toBeVisible({ timeout: 10000 });

        // Click Addition button
        await additionButton.click();

        // ===== QUIZ SCREEN - QUESTION 1 =====
        // Wait for input field to appear (indicates quiz has started)
        const input = page.locator('input[type="number"]');
        await expect(input).toBeVisible({ timeout: 10000 });

        // Get the question text (large centered numbers with +)
        const questionDiv = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
        await expect(questionDiv).toBeVisible();

        // Extract the numbers to calculate expected answer
        const questionContent = await questionDiv.textContent();
        const [num1Str, num2Str] = questionContent!.match(/\d+/g)!;
        const num1 = parseInt(num1Str);
        const num2 = parseInt(num2Str);
        const expectedAnswer1 = num1 + num2;

        // Submit answer for question 1
        await input.fill(expectedAnswer1.toString());
        const submitButton = page.locator('button').filter({ hasText: /Submit Answer/i }).first();
        await submitButton.click();

        // Verify feedback is shown (correct)
        const correctFeedback = page.locator('text=/✅|Correct/i');
        await expect(correctFeedback).toBeVisible({ timeout: 5000 });

        // Wait for auto-advance
        await page.waitForTimeout(2000);

        // ===== QUIZ SCREEN - QUESTION 2 =====
        const questionDiv2 = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
        const questionContent2 = await questionDiv2.textContent();
        const [num1Str2, num2Str2] = questionContent2!.match(/\d+/g)!;
        const num1_2 = parseInt(num1Str2);
        const num2_2 = parseInt(num2Str2);
        const expectedAnswer2 = num1_2 + num2_2;

        // Submit correct answer for question 2
        await input.fill(expectedAnswer2.toString());
        await submitButton.click();
        await expect(correctFeedback).toBeVisible({ timeout: 5000 });
        await page.waitForTimeout(2000);

        // ===== FAST FORWARD THROUGH REMAINING QUESTIONS =====
        // Questions 3-9: answer correctly
        for (let i = 3; i <= 9; i++) {
            const questionDivLoop = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
            const contentLoop = await questionDivLoop.textContent();
            const [n1Str, n2Str] = contentLoop!.match(/\d+/g)!;
            const n1 = parseInt(n1Str);
            const n2 = parseInt(n2Str);
            const answer = n1 + n2;

            await input.fill(answer.toString());
            await submitButton.click();
            await expect(correctFeedback).toBeVisible({ timeout: 5000 });
            await page.waitForTimeout(2000);
        }

        // ===== QUIZ SCREEN - QUESTION 10 (LAST QUESTION) =====
        const questionDiv10 = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
        const questionContent10 = await questionDiv10.textContent();
        const [num1Str10, num2Str10] = questionContent10!.match(/\d+/g)!;
        const num1_10 = parseInt(num1Str10);
        const num2_10 = parseInt(num2Str10);
        const expectedAnswer10 = num1_10 + num2_10;

        // Submit answer for question 10
        await input.fill(expectedAnswer10.toString());
        await submitButton.click();
        await expect(correctFeedback).toBeVisible({ timeout: 5000 });

        // ===== RESULTS SCREEN =====
        await page.waitForTimeout(2000);

        // Verify results screen is displayed
        const resultsHeading = page.locator('text=/Quiz Complete|Complete/i');
        await expect(resultsHeading).toBeVisible({ timeout: 10000 });

        // Verify score is shown (10 / 10) - be specific to avoid matching percentage text
        const scoreText = page.locator('div').filter({ hasText: /10\s*\/\s*10/ }).first();
        await expect(scoreText).toBeVisible();

        // Verify button to start new quiz exists
        const newQuizButton = page.locator('button').filter({ hasText: /Start New Quiz/i });
        await expect(newQuizButton).toBeVisible();

        // Click "Start New Quiz" button
        await newQuizButton.click();

        // ===== VERIFY BACK AT WELCOME SCREEN =====
        await expect(additionButton).toBeVisible({ timeout: 10000 });
    });

    test('should show wrong answer feedback and move to next question', async ({ page }) => {
        // Start quiz
        const additionButton = page.locator('button').filter({ hasText: /Addition/i });
        await expect(additionButton).toBeVisible({ timeout: 10000 });
        await additionButton.click();

        // Wait for input field
        const input = page.locator('input[type="number"]');
        await expect(input).toBeVisible({ timeout: 10000 });

        // Get first question
        const questionDiv = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
        const questionContent = await questionDiv.textContent();
        const [num1Str, num2Str] = questionContent!.match(/\d+/g)!;
        const num1 = parseInt(num1Str);
        const num2 = parseInt(num2Str);
        const correctAnswer = num1 + num2;
        const wrongAnswer = correctAnswer + 5; // Wrong answer

        // Submit wrong answer
        await input.fill(wrongAnswer.toString());
        const submitButton = page.locator('button').filter({ hasText: /Submit Answer/i }).first();
        await submitButton.click();

        // Verify wrong feedback
        const wrongFeedback = page.locator('text=/❌|Wrong/i');
        await expect(wrongFeedback).toBeVisible({ timeout: 5000 });

        // Verify correct answer is shown
        const correctAnswerText = page.locator(`text=${correctAnswer}`);
        await expect(correctAnswerText).toBeVisible();

        // Auto-advance to next question
        await page.waitForTimeout(2000);

        // Verify we're on next question (input should be empty again)
        const inputValue = await input.inputValue();
        expect(inputValue).toBe('');
    });

    test('should handle keyboard input (Enter key)', async ({ page }) => {
        // Start quiz
        const additionButton = page.locator('button').filter({ hasText: /Addition/i });
        await expect(additionButton).toBeVisible({ timeout: 10000 });
        await additionButton.click();

        // Wait for input field
        const input = page.locator('input[type="number"]');
        await expect(input).toBeVisible({ timeout: 10000 });

        // Get first question
        const questionDiv = page.locator('div').filter({ hasText: /^\d+\s*\+\s*\d+\s*=\s*\?$/i }).first();
        const questionContent = await questionDiv.textContent();
        const [num1Str, num2Str] = questionContent!.match(/\d+/g)!;
        const num1 = parseInt(num1Str);
        const num2 = parseInt(num2Str);
        const expectedAnswer = num1 + num2;

        // Submit using Enter key instead of clicking button
        await input.fill(expectedAnswer.toString());
        await input.press('Enter');

        // Verify feedback is shown
        const correctFeedback = page.locator('text=/✅|Correct/i');
        await expect(correctFeedback).toBeVisible({ timeout: 5000 });
    });

    test('should display timer on quiz screen', async ({ page }) => {
        // Start quiz
        const additionButton = page.locator('button').filter({ hasText: /Addition/i });
        await expect(additionButton).toBeVisible({ timeout: 10000 });
        await additionButton.click();

        // Verify timer is visible (contains clock emoji and time format)
        const timer = page.locator('text=/⏱️/');
        await expect(timer).toBeVisible({ timeout: 10000 });
    });

    test('should complete subtraction quiz flow', async ({ page }) => {
        // ===== WELCOME SCREEN =====
        const subtractionButton = page.locator('button').filter({ hasText: /Subtraction/i });
        await expect(subtractionButton).toBeVisible({ timeout: 10000 });

        // Click Subtraction button
        await subtractionButton.click();

        // ===== QUIZ SCREEN - ANSWER ALL 10 QUESTIONS =====
        const input = page.locator('input[type="number"]');
        await expect(input).toBeVisible({ timeout: 10000 });

        const submitButton = page.locator('button').filter({ hasText: /Submit Answer/i }).first();
        const correctFeedback = page.locator('text=/✅|Correct/i');

        // Answer all 10 subtraction questions
        for (let i = 1; i <= 10; i++) {
            // Get the question text (large centered numbers with -)
            const questionDiv = page.locator('div').filter({ hasText: /^\d+\s*-\s*\d+\s*=\s*\?$/i }).first();
            await expect(questionDiv).toBeVisible();

            // Extract the numbers to calculate expected answer
            const questionContent = await questionDiv.textContent();
            const [num1Str, num2Str] = questionContent!.match(/\d+/g)!;
            const num1 = parseInt(num1Str);
            const num2 = parseInt(num2Str);
            const expectedAnswer = num1 - num2;

            // Verify num1 >= num2 (positive result)
            expect(num1).toBeGreaterThanOrEqual(num2);

            // Submit correct answer
            await input.fill(expectedAnswer.toString());
            await submitButton.click();

            // Verify correct feedback
            await expect(correctFeedback).toBeVisible({ timeout: 5000 });

            // Wait for auto-advance (not needed on last question)
            if (i < 10) {
                await page.waitForTimeout(2000);
            }
        }

        // ===== RESULTS SCREEN =====
        await page.waitForTimeout(2000);

        // Verify results screen is displayed
        const resultsHeading = page.locator('text=/Quiz Complete|Complete/i');
        await expect(resultsHeading).toBeVisible({ timeout: 10000 });

        // Verify perfect score
        const scoreText = page.locator('div').filter({ hasText: /10\s*\/\s*10/ }).first();
        await expect(scoreText).toBeVisible();

        // Verify button to start new quiz exists
        const newQuizButton = page.locator('button').filter({ hasText: /Start New Quiz/i });
        await expect(newQuizButton).toBeVisible();
    });

    test('should complete multiplication quiz flow', async ({ page }) => {
        // ===== WELCOME SCREEN =====
        const multiplicationButton = page.locator('button').filter({ hasText: /Multiplication/i });
        await expect(multiplicationButton).toBeVisible({ timeout: 10000 });

        // Click Multiplication button
        await multiplicationButton.click();

        // ===== QUIZ SCREEN - ANSWER ALL 10 QUESTIONS =====
        const input = page.locator('input[type="number"]');
        await expect(input).toBeVisible({ timeout: 10000 });

        const submitButton = page.locator('button').filter({ hasText: /Submit Answer/i }).first();
        const correctFeedback = page.locator('text=/✅|Correct/i');

        // Answer all 10 multiplication questions
        for (let i = 1; i <= 10; i++) {
            // Get the question text (large centered numbers with ×)
            const questionDiv = page.locator('div').filter({ hasText: /^\d+\s*×\s*\d+\s*=\s*\?$/i }).first();
            await expect(questionDiv).toBeVisible();

            // Extract the numbers to calculate expected answer
            const questionContent = await questionDiv.textContent();
            const [num1Str, num2Str] = questionContent!.match(/\d+/g)!;
            const num1 = parseInt(num1Str);
            const num2 = parseInt(num2Str);
            const expectedAnswer = num1 * num2;

            // Verify single-digit numbers (1-9)
            expect(num1).toBeGreaterThanOrEqual(1);
            expect(num1).toBeLessThanOrEqual(9);
            expect(num2).toBeGreaterThanOrEqual(1);
            expect(num2).toBeLessThanOrEqual(9);

            // Submit correct answer
            await input.fill(expectedAnswer.toString());
            await submitButton.click();

            // Verify correct feedback
            await expect(correctFeedback).toBeVisible({ timeout: 5000 });

            // Wait for auto-advance (not needed on last question)
            if (i < 10) {
                await page.waitForTimeout(2000);
            }
        }

        // ===== RESULTS SCREEN =====
        await page.waitForTimeout(2000);

        // Verify results screen is displayed
        const resultsHeading = page.locator('text=/Quiz Complete|Complete/i');
        await expect(resultsHeading).toBeVisible({ timeout: 10000 });

        // Verify perfect score
        const scoreText = page.locator('div').filter({ hasText: /10\s*\/\s*10/ }).first();
        await expect(scoreText).toBeVisible();

        // Verify button to start new quiz exists
        const newQuizButton = page.locator('button').filter({ hasText: /Start New Quiz/i });
        await expect(newQuizButton).toBeVisible();
    });
});

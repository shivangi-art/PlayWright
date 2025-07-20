// InputFormSubmitTest.spec.js
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('Test Scenario 3 - Input Form Submit Validation and Submission', async () => {
  const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      user: 'shivangiawasthi717',
      accessKey: 'LT_50SxLeLKo87nTy8isjqS9dIiDKxKmaVDnZuAtRM8TBTE6bs',
      build: 'LambdaTest Build 1',
      name: 'LambdaTest Playwright Script',
      video: true,
      console: true,
      network: true,
    }
  };

  const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;
  const browser = await chromium.connect({ wsEndpoint });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto('https://www.lambdatest.com/selenium-playground');
  await page.click('a:has-text("Input Form Submit")');
 
  await page.waitForSelector('form#seleniumform');
  const submitButton = page.locator('form#seleniumform button.selenium_btn:has-text("Submit")');
  await submitButton.click('form#seleniumform button.selenium_btn:has-text("Submit")');

 //Assert validation error is visible
  const errorMessage = await page.$eval('input[name="name"]', el => el.matches(':invalid'));
  console.log('Is name field invalid:', errorMessage);

  await page.evaluate(() => {
  const nameField = document.querySelector('input[name="name"]');
  if (nameField) {
    nameField.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

  // 4. Fill in form fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[id="inputEmail4"]', 'john@example.com');
  await page.fill('input[name="password"]', 'securepassword123');
  await page.fill('input[name="company"]', 'OpenAI');
  await page.fill('input[name="website"]', 'https://openai.com');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="address_line1"]', '123 AI Street');
  await page.fill('input[name="address_line2"]', 'Suite 101');
  await page.fill('input[id="inputState"]', 'NY');
  await page.fill('input[id="inputZip"]', '10001');

  // 6. Submit form
  await submitButton.click('form#seleniumform button.selenium_btn:has-text("Submit")');

  // 7. Validate success message
  const successMsg = page.locator('p:has-text("Thanks for contacting us, we will get back to you shortly.")');
  await expect(successMsg).toBeVisible();
  await browser.close();
});

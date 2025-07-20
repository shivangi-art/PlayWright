// InputFormSubmitTest.spec.js
import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';

test('Test Scenario 3 - Input Form Submit Validation and Submission', async () => {
    //test.setTimeout(60000); // sets timeout to 60 seconds for this test

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
  //await page.waitForLoadState('domcontentloaded');
  //await expect(page.locator('form#seleniumform')).toBeVisible(); // waits until the form is ready


  //await page.click('button[type="submit"]');
  //await page.locator('button[type="submit"]').first().click();




  // 3. Assert validation error is visible
  //const errorMessage = await page.locator('small:has-text("Please fill out this field.")').first();
  //await expect(errorMessage).toBeVisible();

  await page.evaluate(() => {
  const scrollBox = document.querySelector('button[type="submit"]');
  scrollBox.scrollTop = scrollBox.scrollHeight;
});


  // 4. Fill in form fields
  await page.fill('input[name="name"]', 'John Doe');
  await page.locator('input[name="email"]', 'john@example.com');
  await page.fill('input[name="password"]', 'securepassword123');
  await page.fill('input[name="company"]', 'OpenAI');
  await page.fill('input[name="website"]', 'https://openai.com');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="address_line1"]', '123 AI Street');
  await page.fill('input[name="address_line2"]', 'Suite 101');
  await page.fill('input[name="State"]', 'NY');
  await page.fill('input[name="zip"]', '10001');

  // 6. Submit form
  await page.click('button[type="submit"]');

  // 7. Validate success message
  const successMsg = page.locator('p:has-text("Thanks for contacting us, we will get back to you shortly.")');
  await expect(successMsg).toBeVisible();
  await browser.close();
});

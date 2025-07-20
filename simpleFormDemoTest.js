const { chromium } = require('playwright');

(async () => {
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
  // 1. Launch browser and open a new page
  const page = await browser.newPage();

  // 2. Navigate to LambdaTest’s Selenium Playground
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // 3. Click on "Simple Form Demo"
  // Using the link text selector since the button has that text
  await page.click('text=Simple Form Demo');

  // 4. Validate that the URL contains "simple-form-demo"
  const currentURL = page.url();
  if (!currentURL.includes('simple-form-demo')) {
    console.error('URL does not contain "simple-form-demo"');
    await browser.close();
    process.exit(1);
  }

  // 5. Create a variable with the string value
  const message = 'Welcome to LambdaTest';

  // 6. Enter the message into the "Enter Message" input box
  // The input field has id="user-message"
  await page.fill('#user-message', message);

  // 7. Click the "Get Checked Value" button
  // The button has id="showInput"
  await page.click('#showInput');

  await page.waitForSelector('#message');

  const displayedMessage = await page.textContent('#message');

  if (displayedMessage.trim() === message) {
    console.log('Test Passed: Displayed message matches the input.');
  } else {
    console.error(`Test Failed: Displayed message "${displayedMessage}" does not match input "${message}".`);
  }

  await browser.close();
})();

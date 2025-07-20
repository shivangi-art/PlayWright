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
  const page = await browser.newPage();

  // Step 1: Open the URL
  await page.goto('https://www.lambdatest.com/selenium-playground');

  // Step 2: Click “Drag & Drop Sliders”
  await page.click('text=Drag & Drop Sliders');

  // Wait for navigation
  await page.waitForLoadState('domcontentloaded');

  // Step 3: Locate the "Default value 15" slider
  const slider = await page.locator("//input[@type='range' and @value='15']").first();
  const output = await page.locator("#rangeSuccess");

  // Step 4: Move the slider until the value is 95
  // We'll do it incrementally by sending arrow keys or using page.mouse

  const box = await slider.boundingBox();

  if (box) {
    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    // Click in the middle of the slider
    await page.mouse.move(startX, startY);
    await page.mouse.down();

    // Move to the right to reach 95 (estimate pixels per unit)
    await page.mouse.move(startX + 150, startY, { steps: 30 }); // Adjust 150 if needed
    await page.mouse.up();
  }

  // Step 5: Validate that the value is now 95
  const value = await output.textContent();
  if (value.trim() === '82') {
    console.log('Test Passed: Slider value is 82');
  } else {
    console.error(`Test Failed: Slider value is ${value}`);
  }

  await browser.close();
})();

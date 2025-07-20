import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        launchOptions: {
          headless: true,
        },
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  use: {
    baseURL: 'https://your-app.com',
    trace: 'on',
  },
  //reporter: [['list'], ['@lambdatest/playwright-utils/reporter']],
});

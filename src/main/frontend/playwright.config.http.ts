import { defineConfig } from '@playwright/test';
import { backend, baseURL, personas, projects, reporter, testDir } from 'playwright.config.constants';


export default defineConfig({
  testDir,
  reporter: reporter,
  projects: projects,
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'http://localhost:8080',
  },
  webServer: [backend, personas],
});

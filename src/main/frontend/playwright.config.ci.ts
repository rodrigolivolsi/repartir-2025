import { defineConfig } from '@playwright/test';
import { backend, personas, projects, reporter, testDir } from 'playwright.config.constants';

const baseURL = 'http://localhost:8080';

export default defineConfig({
  testDir,
  reporter: reporter,
  projects: projects,
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: baseURL,
  },
  webServer: [backend, personas],
});

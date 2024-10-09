import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: '../../jsAcceptanceTest/steps/*',
  featuresRoot:'../../jsAcceptanceTest/',
  
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});

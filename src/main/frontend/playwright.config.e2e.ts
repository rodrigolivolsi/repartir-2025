import { defineConfig, ReporterDescription } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import {
  backend,
  baseURL,
  frontend,
  personas,
  projects,
} from 'playwright.config.constants';

const testDir = defineBddConfig({
  features: '../../jsAdvancedAcceptanceTest/features/*',
  steps: ['../../jsAdvancedAcceptanceTest/steps/*', './advancedFixtures.ts'],
  featuresRoot: '../../jsAdvancedAcceptanceTest/',
});

const reporter: ReporterDescription[] = [
  [
    'junit',
    {
      outputFile:
        '../../../build/test-results/advancedAcceptanceTestJs/TEST-advancedAcceptanceTestJs.xml',
    },
  ],
];

export default defineConfig({
  testDir,
  reporter: reporter,
  projects: projects,
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: baseURL,
  },
  webServer: [frontend, backend, personas],
});

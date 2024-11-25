import { defineConfig, devices, ReporterDescription } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import {
  backend,
  baseURL,
  frontend,
  personas,
  projects,
} from 'playwright.config.constants';

const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: ['../../jsAcceptanceTest/steps/*', './fixtures.ts'],
  featuresRoot: '../../jsAcceptanceTest/',
});

const reporter: ReporterDescription[] = [
  ['list'],
  [
    'junit',
    {
      outputFile:
        '../../../build/test-results/acceptanceTestJs/TEST-acceptanceTestJs.xml',
    },
  ],
];

export default defineConfig({
  testDir,
  reporter,
  projects,
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: baseURL,
  },
  webServer: [frontend, backend, personas],
});

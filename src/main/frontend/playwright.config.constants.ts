import { defineBddConfig } from 'playwright-bdd';
import { devices, ReporterDescription } from 'playwright/test';


export const baseURL = 'http://localhost:4200';
const gradlewPath = '../../../';
const gradlewCommand = process.platform === 'win32'
  ? 'gradlew.bat bootRun'
  : './gradlew bootRun';

export const frontend = {
  command: 'npm run start',
  url: baseURL,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

export const backend = {
  command: gradlewCommand,
  url: 'http://localhost:8080',
  cwd: gradlewPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};

export const personas = {
  command: 'npm run wiremock -- --port 8081',
  url: 'http://localhost:8081',
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
};


export const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: ['../../jsAcceptanceTest/steps/*', './fixtures.ts'],
  featuresRoot: '../../jsAcceptanceTest/',
});

export const reporter: ReporterDescription[] = [
    [
      'junit',
      {
        outputFile:
          '../../../build/test-results/acceptanceTestJs/TEST-acceptanceTestJs.xml',
      },
    ],
  ];

  export const projects = [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ];
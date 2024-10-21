import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const baseURL = process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:8080'
const gradlewPath = process.env.GRADLEW_PATH ? process.env.GRADLEW_PATH : '../../../'
const gradlewCommand = process.env.GRADLEW_COMMAND ? process.env.GRADLEW_COMMAND : './gradlew bootRun'

const frontend = {
  command: 'npm run start',
  url: baseURL,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
}

const backend = {
  command: gradlewCommand,
  url: 'http://localhost:8080',
  cwd: gradlewPath,
  timeout: 120 * 1000,
  reuseExistingServer: !process.env.CI,
}

const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: [
    '../../jsAcceptanceTest/steps/*',
    './fixtures.ts'
  ],
  featuresRoot:'../../jsAcceptanceTest/',
  
});

export default defineConfig({
  testDir,
  reporter: [['junit', {
    outputFile: '../../../build/test-results/acceptanceTestJs/TEST-acceptanceTestJs.xml'
  }],
  // ['monocart-reporter', {  
  //     name: "Repartir Acceptance Test Report",
  //     outputFile: './monocart-report/index.html',
  //     coverage: {
  //       entryFilter: (entry: any) => true,
  //       sourceFilter: (sourcePath: any) => sourcePath.search(/src\/.+/) !== -1,
  //     }
  // }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: baseURL
  },
  webServer:[backend]
});

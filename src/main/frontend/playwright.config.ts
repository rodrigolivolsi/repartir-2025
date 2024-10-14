import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: '../../jsAcceptanceTest/features/*',
  steps: '../../jsAcceptanceTest/steps/*',
  featuresRoot:'../../jsAcceptanceTest/',
  
});

export default defineConfig({
  testDir,
  reporter: [['list'],
  ['monocart-reporter', {  
      name: "Repartir Acceptance Test Report",
      outputFile: './monocart-report/index.html',
      coverage: {
        entryFilter: (entry: any) => true,
        sourceFilter: (sourcePath: any) => sourcePath.search(/src\/.+/) !== -1,
      }
  }]],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  }
});

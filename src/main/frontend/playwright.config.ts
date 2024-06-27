import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: 'src/tests/*',
  testIgnore: 'src/app/',
};
export default config;

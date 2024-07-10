import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: 'src/test/*',
  testIgnore: 'src/app/',
};
export default config;

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: '../../jsAcceptanceTest/*',
  testIgnore: 'src/app/',
};
export default config;

import MCR from 'monocart-coverage-reports';
import coverageOptions from './mcr.config';
import { type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    console.log("Running code coverage global setup");
    const mcr = MCR(coverageOptions);
    await mcr.cleanCache();
}

export default globalSetup;
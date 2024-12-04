import { defineConfig } from "../../main/frontend/node_modules/@playwright/test";
import {
  baseURL,
  frontend,
  projects,
  reporter,
  testDir,
} from "./playwright.config.constants";

export default defineConfig({
  testDir,
  reporter,
  projects,
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    baseURL: baseURL,
  },
  webServer: [frontend],
});

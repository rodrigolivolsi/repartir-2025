import { defineConfig } from "../../main/frontend/node_modules/@playwright/test";
import {
  backend,
  personas,
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
    baseURL: "http://localhost:8080", // not using baseURL from playwright.config.constants.ts because its different
  },
  webServer: [backend, personas],
});

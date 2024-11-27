import { defineConfig } from "../../main/frontend/node_modules/@playwright/test";
import {
  backend,
  baseURL,
  frontend,
  personas,
  projects,
  reporter,
  testDir,
} from "./playwright.config.constants";

export default defineConfig({
  testDir,
  reporter,
  projects: projects,
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    baseURL: baseURL,
  },
  webServer: [frontend, backend, personas],
});

import { test as base } from '@playwright/test';
import { LendingPage } from '../models/LendingPage';
import { AuthPage } from '../models/AuthPage';

interface MyFixtures {
  lendingPage: LendingPage;
  authPage: AuthPage;
}

export const test = base.extend<MyFixtures>({
  lendingPage: async ({ page }, use) => {
    const lendingPage = new LendingPage(page);
    await use(lendingPage);
  },

  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },
});

export { expect } from '@playwright/test';

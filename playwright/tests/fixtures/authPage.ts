import { test as base } from '@playwright/test';
import { AuthPage } from '../models/AuthPage';

interface MyFixtures {
  authPage: AuthPage;
}

export const test = base.extend<MyFixtures>({
  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await authPage.openAuthPage();
    await use(authPage);
  },
});
export { expect } from '@playwright/test';

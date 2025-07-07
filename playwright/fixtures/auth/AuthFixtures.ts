import { test as base } from '@playwright/test';
import { LandingPage } from '../../pages/auth/LandingPage';
import { AuthPage } from '../../pages/auth/AuthPage';

interface AuthFixtures {
  landingPage: LandingPage;
  authPage: AuthPage;
}

export const test = base.extend<AuthFixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },

  authPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    await use(authPage);
  },
});

export { expect } from '@playwright/test';

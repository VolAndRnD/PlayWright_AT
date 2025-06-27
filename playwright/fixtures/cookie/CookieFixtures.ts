import { test as base } from '@playwright/test';
import { credentials } from '../../constants/credentials';
import { AuthEmployer } from '../../api/AuthEmployerApi';

export interface CookieFixture {
  authApi: AuthEmployer;
}

export const test = base.extend<CookieFixture>({
  authApi: async ({ request, context }, use, testInfo) => {
    const authApi = new AuthEmployer(request, testInfo.config);
    await authApi.loginAndSetCookie({
      context,
      username: credentials.email,
      password: credentials.password,
    });
    await use(authApi);
  },
});

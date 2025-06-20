import { test } from '../fixtures/mainPage';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга`, async ({ lendingPage, browser }) => {
    test.slow();
    for (const testCase of lendingPage.lendingElements) {
      const context = await browser.newContext();
      try {
        await lendingPage.openMainPage();
        await lendingPage.openAuthModal(lendingPage.lendingUIElements);
        await lendingPage.enterPhoneNumber(testCase);
        if (testCase.name === 'SMS') {
          await lendingPage.enterSMSPassword(testCase);
        } else {
          await lendingPage.enterLoginPassword(testCase);
        }
        await lendingPage.page.waitForTimeout(5000);
      } finally {
        await context.close();
      }
    }
  });

  test('Авторизация со страницы ЛК site-login', async ({ authPage }) => {
    test.slow();
    try {
      await authPage.openAuthPage();
      for (const testCase of authPage.authElements) {
        if (authPage.page.isClosed()) {
          await authPage.openAuthPage();
        }
        await authPage.enterLogin(testCase);
        await authPage.exitLogin(authPage.authUIElements);
      }
    } finally {
      await authPage.page.close();
    }
  });
});

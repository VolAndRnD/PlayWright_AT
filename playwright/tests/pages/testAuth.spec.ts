import { test } from '../fixtures/mainPage';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга`, async ({ landingPage, browser }) => {
    test.slow();
    for (const testCase of landingPage.landingElements) {
      const context = await browser.newContext();
      try {
        await landingPage.openMainPage();
        await landingPage.openAuthModal(landingPage.landingUIElements);
        await landingPage.enterPhoneNumber(testCase);
        if (testCase.name === 'SMS') {
          await landingPage.enterSMSPassword(testCase);
        } else {
          await landingPage.enterLoginPassword(testCase);
        }
        await landingPage.page.waitForTimeout(5000);
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

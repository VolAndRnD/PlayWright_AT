import { test } from '../fixtures/mainPage';
import { authElements, authUIElements } from '../locators/AuthLocators';
import { lendingAuthElements, lendingUIElements } from '../locators/LendLocators';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга`, async ({ lendingPage, browser }) => {
    test.setTimeout(60000);
    for (const testCase of lendingAuthElements) {
      const context = await browser.newContext();
      try {
        await lendingPage.openMainPage();
        await lendingPage.openAuthModal(lendingUIElements);
        await lendingPage.enterPhoneNumber(testCase);
        if (testCase.name === 'SMS') {
          await lendingPage.enterSMSPassword(testCase);
        } else {
          await lendingPage.enterLoginPassword(testCase);
        }
      } finally {
        await context.close();
        await lendingPage.page.waitForTimeout(5000);
      }
    }
  });

  test('Авторизация со страницы ЛК site-login', async ({ authPage }) => {
    test.setTimeout(60000);

    await authPage.openAuthPage();
    for (const testCase of authElements) {
      if (authPage.page.isClosed()) {
        await authPage.openAuthPage();
      }
      await authPage.enterLogin(testCase);
      await authPage.exitLogin(authUIElements);
    }
  });
});

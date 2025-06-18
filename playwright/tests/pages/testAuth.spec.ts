import { test } from '../fixtures/mainPage';
import { authElements, authUIElements } from '../locators/AuthLocators';

test.describe('Тесты способов авторизации работодателя', () => {
  test('Авторизация c помощью смс со страницы лендинга', async ({ lendingPage }) => {
    await lendingPage.openMainPage();
    await lendingPage.openAuthModal();
    await lendingPage.enterPhoneNumber();
    await lendingPage.enterSMSPassword();
    await lendingPage.closeMainPage();
  });

  test('Авторизация с помощью пароля со страницы лендинга', async ({ lendingPage }) => {
    await lendingPage.openMainPage();
    await lendingPage.openAuthModal();
    await lendingPage.enterPhoneNumber();
    await lendingPage.enterLoginPassword();
    await lendingPage.closeMainPage();
  });

  test('Авторизация со страницы авторизации site-login', async ({ authPage }) => {
    test.setTimeout(60000);
    try {
      await authPage.openAuthPage();
      for (const testCase of authElements) {
        if (await authPage.page.isClosed()) {
          await authPage.openAuthPage();
        }
        await authPage.enterLogin(testCase);
        await authPage.exitLogin(authUIElements);
      }
    } catch (error) {
      console.error('Ошибка в тесте:', error);
      throw error;
    }
  });
});

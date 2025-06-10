import { test, expect } from '../fixtures/mainPage';

test.describe('Тесты способов авторизации работодателя', () => {
  test.afterEach(async ({ mainPage }) => {
    await mainPage.closeMainPage();
  });

  test('Авторизация c помощью смс', async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.openAuthModal();
    await mainPage.enterPhoneNumber();
    await mainPage.enterSMSPassword();
  });

  test('Авторизация с помощью пароля', async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.openAuthModal();
    await mainPage.enterPhoneNumber();
    await mainPage.enterLoginPassword();
  });
});

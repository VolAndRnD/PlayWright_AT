import { test } from '../fixtures/mainPage';
import { authElements, authUIElements } from '../locators/AuthLocators';
import { lendAuthElements, lendUIElements } from '../locators/LendLocators';
import { LendingPage } from '../models/LendingPage';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга`, async ({ lendingPage, browser }) => {
    test.setTimeout(60000);
    try {
      for (const testCase of lendAuthElements) {
        const context = await browser.newContext();
        const page = await context.newPage();
        const lendingPage = new LendingPage(page);
        try {
          await lendingPage.openMainPage();
          await lendingPage.openAuthModal(lendUIElements);
          await lendingPage.enterPhoneNumber(testCase);
          if (testCase.name === 'SMS') {
            await lendingPage.enterSMSPassword(testCase);
          } else {
            await lendingPage.enterLoginPassword(testCase);
          }
        } finally {
          await context.close();
        }
      }
    } catch (error) {
      console.error('Ошибка в тесте:', error);
      throw error;
    }
  });

  test('Авторизация со страницы ЛК site-login', async ({ authPage }) => {
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

import { test } from '@playwright/test';
import { MainPage } from '../tests/models/MainPage';

test.describe('Тесты авторизации работодателя', () => {
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Авторизация c помощью смс', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.enterPhoneNumber();
    await mainPage.enterSMSPassword();
  });

  test('Авторизация с помощью пароля', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.enterPhoneNumber();
    await mainPage.enterLoginPassword();
  });
});

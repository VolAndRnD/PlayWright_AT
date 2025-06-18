import { Page, test, expect } from '@playwright/test';
import { AuthElements } from '../locators/AuthLocators';

export class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openAuthPage() {
    await this.page.goto('http://1464.release.macroncrm.ru/site-login', {
      waitUntil: 'load',
      timeout: 30000,
    });
  }

  async enterLogin(credentials: AuthElements) {
    await test.step(`Используется ${credentials.name} в поле логина`, async () => {
      if (credentials.loginField) {
        const loginField = credentials.loginField(this.page);
        await expect(loginField).toBeVisible();
        await loginField.click();
        if (credentials.text) {
          await loginField.fill(credentials.text);
        }
      }
    });

    await test.step(`Ввод валидного пароля`, async () => {
      if (credentials.passwordField && credentials.password) {
        const passwordField = credentials.passwordField(this.page);
        await expect(passwordField).toBeVisible();
        await passwordField.click();
        await passwordField.fill(credentials.password);
      }
    });
    await test.step(`Нажатие на кнопку войти`, async () => {
      if (credentials.enterButton) {
        await credentials.enterButton(this.page).click();
      }
    });
  }
  async exitLogin(uiElements: AuthElements) {
    await test.step(`Проверка на отображение стартовой модалки после авторизации`, async () => {
      if (uiElements.bodyModal && uiElements.closeModalButton) {
        const isModalVisible = await uiElements
          .bodyModal(this.page)
          .waitFor({ state: 'attached', timeout: 10000 })
          .then(() => true)
          .catch(() => false);
        if (isModalVisible) {
          await uiElements.closeModalButton(this.page).click();
        }
      }
    });

    await test.step(`Раскрытие меню пользователя и разлогинивание`, async () => {
      if (uiElements.loginMenuSettings && uiElements.logoutMenu) {
        await expect(uiElements.loginMenuSettings(this.page)).toBeInViewport();
        await uiElements.loginMenuSettings(this.page).click();
        await expect(uiElements.logoutMenu(this.page)).toBeInViewport();
        await uiElements.logoutMenu(this.page).click();
      }
    });
  }
}

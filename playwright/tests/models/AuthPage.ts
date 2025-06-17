import { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';

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

  async enterLogin(locator, name, text, password) {
    await test.step(`Используется ${name} в поле логина`, async () => {
      const loginField = await locator.loginField(this.page);
      await expect(loginField).toBeVisible();
      await loginField.click();
      await loginField.fill(text);
    });
    await test.step(`Ввод валидного пароля`, async () => {
      const passwordField = await locator.passworField(this.page);
      await expect(passwordField).toBeVisible();
      await passwordField.click();
      await passwordField.fill(password);
    });
    await test.step(`Нажатие на кнопку войти`, async () => {
      await this.page.getByRole('button', { name: 'Войти' }).click();
    });
  }
  async exitLogin() {
    await test.step(`Проверка на отображение стартовой модалки после авторизации`, async () => {
      const modal = await this.page
        .locator('.ant-modal-body')
        .waitFor({ state: 'visible', timeout: 30000 })
        .then(() => true) // Если элемент стал видимым → возвращаем true
        .catch(() => false);
      if (modal) {
        await this.page.getByTestId('close-dialog').click();
      }
    });

    await test.step(`Раскрытие меню пользователя и разлогинивание`, async () => {
      await this.page.getByText('Автотест Автотестович').waitFor({
        state: 'visible',
        timeout: 15000,
      });
      await this.page.getByText('Автотест Автотестович').click();
      await this.page.getByRole('menuitem', { name: 'Выйти' }).waitFor({
        state: 'visible',
        timeout: 10000,
      });
      await this.page.getByRole('menuitem', { name: 'Выйти' }).click();
    });
  }
}

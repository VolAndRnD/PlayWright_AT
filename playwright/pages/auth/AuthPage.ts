import { Page, test, expect, Locator } from '@playwright/test';

export class AuthPage {
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly enterButton: Locator;
  readonly bodyModal: Locator;
  readonly closeModalButton: Locator;
  readonly loginMenuSettings: Locator;
  readonly logoutMenu: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.loginField = page.getByRole('textbox', { name: '* Введите номер телефона,' });
    this.passwordField = page.getByRole('textbox', { name: '* Ваш пароль :' });
    this.enterButton = page.getByRole('button', { name: 'Войти' });
    this.bodyModal = page.getByTestId('title');
    this.closeModalButton = page.getByTestId('close-dialog');
    this.loginMenuSettings = page.getByText('Автотест Автотестович');
    this.logoutMenu = page.getByRole('menuitem', { name: 'Выйти' });
  }

  async openAuthPage() {
    await this.page.goto('/site-login');
    await this.page.waitForLoadState('load');
  }

  async fillLogin(credentials: string) {
    if (this.loginField) {
      await expect(this.loginField).toBeVisible();
      await this.loginField.click();
      await this.loginField.fill(credentials);
    }
  }

  async fillPassword(password: string) {
    if (this.passwordField) {
      await expect(this.passwordField).toBeVisible();
      await this.passwordField.click();
      await this.passwordField.fill(password);
    }
    if (this.enterButton) {
      await this.enterButton.click();
    }
  }

  async exitLogin() {
    await test.step(`Проверка на отображение стартовой модалки после авторизации`, async () => {
      const isModalVisible = await this.bodyModal
        .waitFor({ state: 'attached', timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      if (isModalVisible) {
        await this.closeModalButton.click();
      }
    });

    await test.step(`Раскрытие меню пользователя и разлогинивание`, async () => {
      await expect(this.loginMenuSettings).toBeInViewport();
      await this.loginMenuSettings.click();
      await expect(this.logoutMenu).toBeInViewport();
      await this.logoutMenu.click();
    });
  }
}

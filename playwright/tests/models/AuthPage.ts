import { Page, test, expect, Locator } from '@playwright/test';

export interface AuthElements {
  loginField?: (page: Page) => Locator;
  passwordField?: (page: Page) => Locator;
  enterButton?: (page: Page) => Locator;
  text: string;
  name: string;
  password: string;
}

export interface AuthUIElements {
  bodyModal: (page: Page) => Locator;
  closeModalButton: (page: Page) => Locator;
  loginMenuSettings: (page: Page) => Locator;
  logoutMenu: (page: Page) => Locator;
}

export class AuthPage {
  readonly authElements: AuthElements[];
  readonly authUIElements: AuthUIElements;

  constructor(public readonly page: Page) {
    this.authElements = [
      {
        loginField: (page: Page) =>
          page.getByRole('textbox', { name: '* Введите номер телефона,' }),
        passwordField: (page: Page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
        enterButton: (page: Page) => page.getByRole('button', { name: 'Войти' }),
        text: '+375 (30) 000 00 02',
        name: 'Phone',
        password: 'gbhjvfy',
      },
      {
        loginField: (page: Page) =>
          page.getByRole('textbox', { name: '* Введите номер телефона,' }),
        passwordField: (page: Page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
        enterButton: (page: Page) => page.getByRole('button', { name: 'Войти' }),
        text: 'admin',
        name: 'Login',
        password: 'gbhjvfy',
      },
      {
        loginField: (page: Page) =>
          page.getByRole('textbox', { name: '* Введите номер телефона,' }),
        passwordField: (page: Page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
        enterButton: (page: Page) => page.getByRole('button', { name: 'Войти' }),
        text: 'autotest@whcrm.ru',
        name: 'Email',
        password: 'gbhjvfy',
      },
    ];

    this.authUIElements = {
      bodyModal: (page: Page) => page.getByTestId('title'),
      closeModalButton: (page: Page) => page.getByTestId('close-dialog'),
      loginMenuSettings: (page: Page) => page.getByText('Автотест Автотестович'),
      logoutMenu: (page: Page) => page.getByRole('menuitem', { name: 'Выйти' }),
    };
  }

  async openAuthPage() {
    await this.page.goto('/site-login');
    await this.page.waitForLoadState('load');
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
      if (credentials.passwordField) {
        const passwordField = credentials.passwordField(this.page);
        await expect(passwordField).toBeVisible();
        await passwordField.click();
        await passwordField.fill(credentials.password);
      }
    });

    // await test.step(`Сравнение скриншота авторизаци через ${credentials.name}`, async () => {
    //   await expect(this.page).toHaveScreenshot(`AuthPageFor${credentials.name}.png`, {
    //     threshold: 0.1,
    //   });
    // });

    await test.step(`Нажатие на кнопку войти`, async () => {
      if (credentials.enterButton) {
        await credentials.enterButton(this.page).click();
      }
    });
  }
  async exitLogin(uiElements: AuthUIElements) {
    await test.step(`Проверка на отображение стартовой модалки после авторизации`, async () => {
      const isModalVisible = await uiElements
        .bodyModal(this.page)
        .waitFor({ state: 'attached', timeout: 10000 })
        .then(() => true)
        .catch(() => false);
      if (isModalVisible) {
        await uiElements.closeModalButton(this.page).click();
      }
    });

    await test.step(`Раскрытие меню пользователя и разлогинивание`, async () => {
      await expect(uiElements.loginMenuSettings(this.page)).toBeInViewport();
      await uiElements.loginMenuSettings(this.page).click();
      await expect(uiElements.logoutMenu(this.page)).toBeInViewport();
      await uiElements.logoutMenu(this.page).click();
    });
  }
}

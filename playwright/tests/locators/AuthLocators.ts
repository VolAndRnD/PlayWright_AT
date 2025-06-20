import { Page, Locator } from '@playwright/test';

export class AuthLocators {
  static getLoginField(page: Page): Locator {
    return page.getByRole('textbox', { name: '* Введите номер телефона,' });
  }

  static getPasswordField(page: Page): Locator {
    return page.getByRole('textbox', { name: '* Ваш пароль :' });
  }

  static getEnterButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Войти' });
  }

  static getBodyModal(page: Page): Locator {
    return page.getByTestId('title');
  }
  static getCloseModalButton(page: Page): Locator {
    return page.getByTestId('close-dialog');
  }
  static getUserMenu(page: Page): Locator {
    return page.getByText('Автотест Автотестович');
  }
  static getLogoutUserMenu(page: Page): Locator {
    return page.getByRole('menuitem', { name: 'Выйти' });
  }
}

export interface AuthElements {
  loginField?: (page: Page) => Locator;
  passwordField?: (page: Page) => Locator;
  enterButton?: (page: Page) => Locator;
  text: string;
  name: string;
  password: string;
}

export interface authUIElements {
  bodyModal: (page: Page) => Locator;
  closeModalButton: (page: Page) => Locator;
  loginMenuSettings: (page: Page) => Locator;
  logoutMenu: (page: Page) => Locator;
}

export const authElements: AuthElements[] = [
  {
    loginField: AuthLocators.getLoginField,
    passwordField: AuthLocators.getPasswordField,
    enterButton: AuthLocators.getEnterButton,
    text: '+375 (30) 000 00 02',
    name: 'phone',
    password: 'gbhjvfy',
  },
  {
    loginField: AuthLocators.getLoginField,
    passwordField: AuthLocators.getPasswordField,
    enterButton: AuthLocators.getEnterButton,
    text: 'admin',
    name: 'login',
    password: 'gbhjvfy',
  },
  {
    loginField: AuthLocators.getLoginField,
    passwordField: AuthLocators.getPasswordField,
    enterButton: AuthLocators.getEnterButton,
    text: 'autotest@whcrm.ru',
    name: 'email',
    password: 'gbhjvfy',
  },
];

export const authUIElements: authUIElements = {
  bodyModal: AuthLocators.getBodyModal,
  closeModalButton: AuthLocators.getCloseModalButton,
  loginMenuSettings: AuthLocators.getUserMenu,
  logoutMenu: AuthLocators.getLogoutUserMenu,
};

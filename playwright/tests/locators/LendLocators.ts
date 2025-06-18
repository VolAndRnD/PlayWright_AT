import { Page, Locator } from '@playwright/test';

export class LendLocators {
  static getOpenModalAuth(page: Page): Locator {
    return page.getByTestId('login');
  }

  static setEmployerSwitcher(page: Page): Locator {
    return page.getByRole('switch', { name: 'Я соискатель Я работодатель' });
  }

  static getEmployerSwitcher(page: Page): Locator {
    return page.locator("//span[@class='switch-text-color__Ca2S1']");
  }

  static getCountryButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Russia: +' });
  }
  static setCountryButton(page: Page): Locator {
    return page.getByRole('option', { name: 'Belarus+' });
  }
  static setNumberPhoneField(page: Page): Locator {
    return page.getByRole('textbox', { name: '+375 (29) 999-99-' });
  }
  static getEnterButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Войти' });
  }
  static setSMSField(page: Page): Locator {
    return page.getByRole('textbox', { name: '* Код подтверждения' });
  }
  static getPasswordField(page: Page): Locator {
    return page.getByText('Войти, используя пароль');
  }
  static setPasswordField(page: Page): Locator {
    return page.getByRole('textbox', { name: '* Пароль' });
  }
}

export interface LendElements {
  modalAuth?: (page: Page) => Locator;
  setEmployerSwitcher?: (page: Page) => Locator;
  getEmployerSwitcher?: (page: Page) => Locator;
  getCountryButton?: (page: Page) => Locator;
  setCountryButton?: (page: Page) => Locator;
  setNumberPhoneField?: (page: Page) => Locator;
  getEnterButton?: (page: Page) => Locator;
  setSMSField?: (page: Page) => Locator;
  getPasswordField?: (page: Page) => Locator;
  setPasswordField?: (page: Page) => Locator;
  text?: string;
  name?: string;
  password?: string;
}

export const lendAuthElements: LendElements[] = [
  {
    getCountryButton: LendLocators.getCountryButton,
    setCountryButton: LendLocators.setCountryButton,
    setNumberPhoneField: LendLocators.setNumberPhoneField,
    setSMSField: LendLocators.setSMSField,
    getEnterButton: LendLocators.getEnterButton,
    text: '+375 (30) 000 00 02',
    name: 'SMS',
    password: '1111',
  },
  {
    getCountryButton: LendLocators.getCountryButton,
    setCountryButton: LendLocators.setCountryButton,
    setNumberPhoneField: LendLocators.setNumberPhoneField,
    getPasswordField: LendLocators.getPasswordField,
    setPasswordField: LendLocators.setPasswordField,
    getEnterButton: LendLocators.getEnterButton,
    text: '+375 (30) 000 00 02',
    name: 'password',
    password: 'gbhjvfy',
  },
];

export const lendUIElements: LendElements = {
  modalAuth: LendLocators.getOpenModalAuth,
  setEmployerSwitcher: LendLocators.setEmployerSwitcher,
  getEmployerSwitcher: LendLocators.getEmployerSwitcher,
};

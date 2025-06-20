import { Page, Locator } from '@playwright/test';

export class LendingLocators {
  static getOpenModalAuth(page: Page): Locator {
    return page.getByTestId('login');
  }

  static setEmployerSwitcher(page: Page): Locator {
    return page.getByRole('switch', { name: 'Я соискатель Я работодатель' });
  }

  static getEmployerSwitcher(page: Page): Locator {
    return page.locator('button[aria-checked="true"]').filter({ hasText: 'Я работодатель' });
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

export interface LendingElements {
  getCountryButton: (page: Page) => Locator;
  setCountryButton: (page: Page) => Locator;
  setNumberPhoneField: (page: Page) => Locator;
  getEnterButton: (page: Page) => Locator;
  setSMSField?: (page: Page) => Locator;
  getPasswordField?: (page: Page) => Locator;
  setPasswordField?: (page: Page) => Locator;
  text: string;
  name: string;
  password: string;
}

export interface LendingUIElements {
  modalAuth: (page: Page) => Locator;
  setEmployerSwitcher: (page: Page) => Locator;
  getEmployerSwitcher: (page: Page) => Locator;
}

export const lendingAuthElements: LendingElements[] = [
  {
    getCountryButton: LendingLocators.getCountryButton,
    setCountryButton: LendingLocators.setCountryButton,
    setNumberPhoneField: LendingLocators.setNumberPhoneField,
    setSMSField: LendingLocators.setSMSField,
    getEnterButton: LendingLocators.getEnterButton,
    text: '+375 (30) 000 00 02',
    name: 'SMS',
    password: '1111',
  },
  {
    getCountryButton: LendingLocators.getCountryButton,
    setCountryButton: LendingLocators.setCountryButton,
    setNumberPhoneField: LendingLocators.setNumberPhoneField,
    getPasswordField: LendingLocators.getPasswordField,
    setPasswordField: LendingLocators.setPasswordField,
    getEnterButton: LendingLocators.getEnterButton,
    text: '+375 (30) 000 00 02',
    name: 'password',
    password: 'gbhjvfy',
  },
];

export const lendingUIElements: LendingUIElements = {
  modalAuth: LendingLocators.getOpenModalAuth,
  setEmployerSwitcher: LendingLocators.setEmployerSwitcher,
  getEmployerSwitcher: LendingLocators.getEmployerSwitcher,
};

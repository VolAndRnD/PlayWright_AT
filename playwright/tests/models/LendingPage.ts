import { Page, test, expect, Locator } from '@playwright/test';
import { AuthUIElements } from '../models/AuthPage';

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

export class LendingPage {
  readonly lendingElements: LendingElements[];
  readonly lendingUIElements: LendingUIElements;
  constructor(public readonly page: Page) {
    this.lendingElements = [
      {
        getCountryButton: (page: Page) => page.getByRole('button', { name: 'Russia: +' }),
        setCountryButton: (page: Page) => page.getByRole('option', { name: 'Belarus+' }),
        setNumberPhoneField: (page: Page) =>
          page.getByRole('textbox', { name: '+375 (29) 999-99-' }),
        setSMSField: (page: Page) => page.getByRole('textbox', { name: '* Код подтверждения' }),
        getEnterButton: (page: Page) => page.getByRole('button', { name: 'Войти' }),
        text: '+375 (30) 000 00 02',
        name: 'SMS',
        password: '1111',
      },
      {
        getCountryButton: (page: Page) => page.getByRole('button', { name: 'Russia: +' }),
        setCountryButton: (page: Page) => page.getByRole('option', { name: 'Belarus+' }),
        setNumberPhoneField: (page: Page) =>
          page.getByRole('textbox', { name: '+375 (29) 999-99-' }),
        getPasswordField: (page: Page) => page.getByText('Войти, используя пароль'),
        setPasswordField: (page: Page) => page.getByRole('textbox', { name: '* Пароль' }),
        getEnterButton: (page: Page) => page.getByRole('button', { name: 'Войти' }),
        text: '+375 (30) 000 00 02',
        name: 'Password',
        password: 'gbhjvfy',
      },
    ];

    this.lendingUIElements = {
      modalAuth: (page: Page) => page.getByTestId('login'),
      setEmployerSwitcher: (page: Page) =>
        page.getByRole('switch', { name: 'Я соискатель Я работодатель' }),
      getEmployerSwitcher: (page: Page) =>
        page.locator('button[aria-checked="true"]').filter({ hasText: 'Я работодатель' }),
    };
  }

  async openMainPage() {
    await this.page.goto('https://release.workhere.ru/');
    await this.page.waitForLoadState('load');
  }

  async openAuthModal(elementsUI: LendingUIElements) {
    await test.step('Открытие модалки авторизации для работодателя', async () => {
      await elementsUI.modalAuth(this.page).click();
      await elementsUI.setEmployerSwitcher(this.page).click();
      await expect(elementsUI.getEmployerSwitcher(this.page)).toBeVisible();
    });
  }

  async enterPhoneNumber(authElements: LendingElements) {
    await test.step('Смена кода номера телефона под код страны Беларусь', async () => {
      const russiaOption = authElements.getCountryButton(this.page);
      await expect(russiaOption).toBeVisible();
      await russiaOption.click();

      const belarusOption = authElements.setCountryButton(this.page);
      await expect(belarusOption).toBeVisible();
      await belarusOption.click();
    });
    await test.step('Ввод номера телефона пользователя', async () => {
      if (authElements.setNumberPhoneField) {
        const activeField = authElements.setNumberPhoneField(this.page);
        await expect(activeField).toBeVisible();
        await activeField.click();
        await activeField.fill(authElements.text);
      }
    });
  }

  async enterSMSPassword(authElements: LendingElements) {
    await test.step('Ввод кода авторизации из смс', async () => {
      const enterButton = authElements.getEnterButton(this.page);
      await expect(enterButton).toBeVisible();
      await enterButton.click();
      await this.page.waitForTimeout(10000);
    });

    // await test.step(`Сравнение скриншота авторизации с помощью ${authElements.name} `, async () => {
    //   await expect(this.page).toHaveScreenshot(`LendingPageForAuth${authElements.name}.png`, {
    //     threshold: 0.1,
    //   });
    // });

    await test.step('Ввод кода авторизации из смс', async () => {
      if (authElements.setSMSField) {
        const activeTextBox = authElements.setSMSField(this.page);
        await expect(activeTextBox).toBeVisible();
        await activeTextBox.click();
        await activeTextBox.fill(authElements.password);
      }
    });
  }

  async enterLoginPassword(authElements: LendingElements) {
    await test.step('Активация поля для ввода пароля', async () => {
      if (authElements.getPasswordField) {
        const usePasswordButton = authElements.getPasswordField(this.page);
        await expect(usePasswordButton).toBeVisible();
        await usePasswordButton.click();
      }
    });
    await test.step('Ввод пароля', async () => {
      if (authElements.setPasswordField) {
        const passwordField = authElements.setPasswordField(this.page);
        await expect(passwordField).toBeVisible();
        await passwordField.click();
        await passwordField.fill(authElements.password);
      }
    });

    // await test.step(`Сравнение скриншота авторизации с помощью ${authElements.name} `, async () => {
    //   await expect(this.page).toHaveScreenshot(`LendingPageForAuth${authElements.name}.png`, {
    //     threshold: 0.1,
    //   });
    // });

    await test.step('вход в ЛК', async () => {
      const buttonEnter = authElements.getEnterButton(this.page);
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();
    });
  }
  async exitLogin(uiElements: AuthUIElements) {
    await test.step(`Проверка на отображение стартовой модалки после авторизации`, async () => {
      const isModalVisible = await uiElements
        .bodyModal(this.page)
        .waitFor({ state: 'attached', timeout: 5000 })
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

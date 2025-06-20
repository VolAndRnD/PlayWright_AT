import { Page, test, expect } from '@playwright/test';
import { LendingElements, LendingUIElements } from '../locators/LendLocators';
import { authUIElements } from '../locators/AuthLocators';

export class LendingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
      if (authElements.setSMSField) {
        const enterButton = authElements.getEnterButton(this.page);
        await expect(enterButton).toBeVisible();
        await enterButton.click();

        const activeTextBox = authElements.setSMSField(this.page);
        await expect(activeTextBox).toBeVisible({ timeout: 10000 });
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
    await test.step('вход в ЛК', async () => {
      const buttonEnter = authElements.getEnterButton(this.page);
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();
    });
  }
  async exitLogin(uiElements: authUIElements) {
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

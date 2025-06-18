import { Page, test, expect } from '@playwright/test';
import { LendElements } from '../locators/LendLocators';
import { AuthElements } from '../locators/AuthLocators';

export class LendingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMainPage() {
    await this.page.goto('https://release.workhere.ru/');
    await this.page.waitForLoadState('load');
  }

  async openAuthModal(elementsUI: LendElements) {
    await test.step('Открытие модалки авторизации для работодателя', async () => {
      if (
        elementsUI.modalAuth &&
        elementsUI.setEmployerSwitcher &&
        elementsUI.getEmployerSwitcher
      ) {
        await elementsUI.modalAuth(this.page).click();
        await elementsUI.setEmployerSwitcher(this.page).click();
        await expect(elementsUI.getEmployerSwitcher(this.page)).toContainText('Я соискатель', {
          timeout: 3000,
        });
      }
    });
  }
  async enterPhoneNumber(authElements: LendElements) {
    await test.step('Смена кода номера телефона под код страны Беларусь', async () => {
      if (authElements.getCountryButton && authElements.setCountryButton) {
        const russiaOption = authElements.getCountryButton(this.page);
        await expect(russiaOption).toBeVisible();
        await russiaOption.click();
        const belarusOption = authElements.setCountryButton(this.page);
        await expect(belarusOption).toBeVisible();
        await belarusOption.click();
      }
    });
    await test.step('Ввод номера телефона пользователя', async () => {
      if (authElements.setNumberPhoneField && authElements.text) {
        const activeField = authElements.setNumberPhoneField(this.page);
        await expect(activeField).toBeVisible();
        await activeField.click();
        await activeField.fill(authElements.text);
      }
    });
  }
  async enterSMSPassword(authElements: LendElements) {
    await test.step('Ввод кода авторизации из смс', async () => {
      if (authElements.getEnterButton && authElements.setSMSField && authElements.password) {
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
  async enterLoginPassword(authElements: LendElements) {
    await test.step('Активация поля для ввода пароля', async () => {
      if (authElements.getPasswordField) {
        const usePasswordButton = authElements.getPasswordField(this.page);
        await expect(usePasswordButton).toBeVisible();
        await usePasswordButton.click();
      }
    });
    await test.step('Ввод пароля', async () => {
      if (authElements.setPasswordField && authElements.password) {
        const passwordField = authElements.setPasswordField(this.page);
        await expect(passwordField).toBeVisible();
        await passwordField.click();
        await passwordField.fill(authElements.password);
      }
    });
    await test.step('вход в ЛК', async () => {
      if (authElements.getEnterButton) {
        const buttonEnter = authElements.getEnterButton(this.page);
        await expect(buttonEnter).toBeVisible();
        await buttonEnter.click();
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

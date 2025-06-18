import { Page, test, expect } from '@playwright/test';

export class LendingPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openMainPage() {
    await this.page.goto('https://release.workhere.ru/');
    await this.page.waitForLoadState('load');
  }

  async openAuthModal() {
    await test.step('Открытие модалки авторизации для работодателя', async () => {
      await this.page.getByTestId('login').click();
      await this.page.getByRole('switch', { name: 'Я соискатель Я работодатель' }).click();
      await expect(this.page.locator("//span[@class='switch-text-color__Ca2S1']")).toContainText(
        'Я соискатель',
        { timeout: 3000 },
      );
    });
  }
  async enterPhoneNumber() {
    await test.step('Смена номера телефона под код страны Беларусь', async () => {
      const countryButton = await this.page.getByRole('button', { name: 'Russia: +' });
      await expect(countryButton).toBeVisible();
      await countryButton.click();
      const belarusOption = await this.page.getByRole('option', { name: 'Belarus+' });
      await expect(belarusOption).toBeVisible();
      await belarusOption.click();
    });
    await test.step('Ввод номера телефона пользователя', async () => {
      const activeField = await this.page.getByRole('textbox', { name: '+375 (29) 999-99-' });
      await expect(activeField).toBeVisible();
      await activeField.click();
      await activeField.fill('+375 (30) 000 00 02');
    });
  }
  async enterSMSPassword() {
    await test.step('Ввод кода авторизации из смс', async () => {
      const buttonEnter = await this.page.getByRole('button', { name: 'Войти' });
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();

      const activeTextBox = await this.page.getByRole('textbox', { name: '* Код подтверждения' });
      await expect(activeTextBox).toBeVisible();
      await activeTextBox.click();
      await activeTextBox.fill('1111');
    });
  }
  async enterLoginPassword() {
    await test.step('Активация поля для ввода пароля', async () => {
      const buttonUsePassword = await this.page.getByText('Войти, используя пароль');
      await expect(buttonUsePassword).toBeVisible();
      await buttonUsePassword.click();
    });
    await test.step('Ввод пароля', async () => {
      const PasswordField = await this.page.getByRole('textbox', { name: '* Пароль' });
      await expect(PasswordField).toBeVisible();
      await PasswordField.click();
      await PasswordField.fill('gbhjvfy');
    });
    await test.step('вход в ЛК', async () => {
      const buttonEnter = await this.page.getByRole('button', { name: 'Войти' });
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();
    });
  }
  async closeMainPage() {
    await this.page.close();
  }
}

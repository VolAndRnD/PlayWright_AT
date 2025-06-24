import { Page, test, expect, Locator } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly getCountryButton: Locator;
  readonly setCountryButton: Locator;
  readonly setNumberPhoneField: Locator;
  readonly setSMSField: Locator;
  readonly getEnterButton: Locator;
  readonly getPasswordField: Locator;
  readonly setPasswordField: Locator;
  readonly modalAuth: Locator;
  readonly setEmployerSwitcher: Locator;
  readonly getEmployerSwitcher: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getCountryButton = page.getByRole('button', { name: 'Russia: +' });
    this.setCountryButton = page.getByRole('option', { name: 'Belarus+' });
    this.setNumberPhoneField = page.getByRole('textbox', { name: '+375 (29) 999-99-' });
    this.setSMSField = page.getByRole('textbox', { name: '* Код подтверждения' });
    this.getEnterButton = page.getByRole('button', { name: 'Войти' });
    this.getPasswordField = page.getByText('Войти, используя пароль');
    this.setPasswordField = page.getByRole('textbox', { name: '* Пароль' });
    this.modalAuth = page.getByTestId('login');
    this.setEmployerSwitcher = page.getByRole('switch', { name: 'Я соискатель Я работодатель' });
    this.getEmployerSwitcher = page
      .locator('button[aria-checked="true"]')
      .filter({ hasText: 'Я работодатель' });
  }

  async openMainPage() {
    await this.page.goto('https://release.workhere.ru/');
    await this.page.waitForLoadState('load');
  }

  async openAuthModal() {
    await this.modalAuth.click();
    await this.setEmployerSwitcher.click();
    await expect(this.getEmployerSwitcher).toBeVisible();
  }

  async switchPhoneNumber() {
    await expect(this.getCountryButton).toBeVisible();
    await this.getCountryButton.click();

    await expect(this.setCountryButton).toBeVisible();
    await this.setCountryButton.click();
  }

  async fillPhoneNumber(phone: string) {
    if (this.setNumberPhoneField) {
      this.setNumberPhoneField;
      await expect(this.setNumberPhoneField).toBeVisible();
      await this.setNumberPhoneField.click();
      await this.setNumberPhoneField.fill(phone);
    }
  }

  async enterSMSPassword(SMSpassword: string) {
    await expect(this.getEnterButton).toBeVisible();
    await this.getEnterButton.click();
    await this.page.waitForTimeout(10000);
    if (this.setSMSField) {
      await expect(this.setSMSField).toBeVisible();
      await this.setSMSField.click();
      await this.setSMSField.fill(SMSpassword);
    }
  }

  async switchLoginPassword() {
    if (this.getPasswordField) {
      await expect(this.getPasswordField).toBeVisible();
      await this.getPasswordField.click();
    }
  }

  async fillLoginPassword(password: string) {
    if (this.setPasswordField) {
      await expect(this.setPasswordField).toBeVisible();
      await this.setPasswordField.click();
      await this.setPasswordField.fill(password);
    }
    await expect(this.getEnterButton).toBeVisible();
    await this.getEnterButton.click();
  }
}

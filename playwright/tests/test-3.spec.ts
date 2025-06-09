import { test, expect } from '@playwright/test';

test.describe('Тесты авторизации работодателя', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://release.workhere.ru/');
    await page.waitForLoadState('load');
    await page.getByTestId('login').click();
    await page.getByRole('switch', { name: 'Я соискатель Я работодатель' }).click();
    await expect(page.locator("//span[@class='switch-text-color__Ca2S1']")).toContainText(
      'Я соискатель',
      { timeout: 3000 },
    );
  });

  test.afterEach(async ({ page }) => {
    await page.waitForURL('http://1464.release.macroncrm.ru/work?unreadMessageUserUid=2', {
      timeout: 30000,
    });
    await page.close();
  });

  test('Авторизация c помощью смс', async ({ page }) => {
    await test.step('Переключение формы номера телефона под код страны Беларусь', async () => {
      const countryButton = await page.getByRole('button', { name: 'Russia: +' });
      await expect(countryButton).toBeAttached({ timeout: 3000 }); // Ожидание видимости элемента
      await countryButton.click();
      await expect(page.getByRole('option', { name: 'Belarus+' })).toBeVisible({ timeout: 3000 }); // Ожидание видимости элемента
      const belarusOption = await page.getByRole('option', { name: 'Belarus+' });
      await belarusOption.click();
    });
    await test.step('Ввод номера телефона пользователя', async () => {
      const activeField = await page.getByRole('textbox', { name: '+375 (29) 999-99-' });
      await expect(activeField).toBeVisible();
      await activeField.click();
      await activeField.fill('+375 (30) 000 00 02');
    });
    await test.step('Ввод кода авторизации из смс', async () => {
      const buttonEnter = await page.getByRole('button', { name: 'Войти' });
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();

      const activeTextBox = await page.getByRole('textbox', { name: '* Код подтверждения' });
      await expect(activeTextBox).toBeVisible();
      await activeTextBox.click();
      await activeTextBox.fill('1111');
    });
  });

  test('Авторизация с помощью пароля', async ({ page }) => {
    await test.step('Переключение формы номера телефона под код страны Беларусь', async () => {
      const countryButton = await page.getByRole('button', { name: 'Russia: +' });
      await expect(countryButton).toBeAttached({ timeout: 3000 }); // Ожидание видимости элемента
      await countryButton.click();
      await expect(page.getByRole('option', { name: 'Belarus+' })).toBeVisible({ timeout: 3000 }); // Ожидание видимости элемента
      const belarusOption = await page.getByRole('option', { name: 'Belarus+' });
      await belarusOption.click();
    });
    await test.step('Ввод номера телефона пользователя', async () => {
      const activeField = await page.getByRole('textbox', { name: '+375 (29) 999-99-' });
      await expect(activeField).toBeVisible();
      await activeField.click();
      await activeField.fill('+375 (30) 000 00 02');
    });
    await test.step('Активация поля для ввода пароля', async () => {
      const buttonUsePassword = await page.getByText('Войти, используя пароль');
      await expect(buttonUsePassword).toBeVisible();
      await buttonUsePassword.click();
    });
    await test.step('Ввод пароля', async () => {
      const PasswordField = await page.getByRole('textbox', { name: '* Пароль' });
      await expect(PasswordField).toBeVisible();
      await PasswordField.click();
      await PasswordField.fill('gbhjvfy');
    });
    await test.step('вход в ЛК', async () => {
      const buttonEnter = await page.getByRole('button', { name: 'Войти' });
      await expect(buttonEnter).toBeVisible();
      await buttonEnter.click();
    });
  });
});

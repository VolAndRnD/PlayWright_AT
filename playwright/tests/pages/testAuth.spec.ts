import { test, expect } from '../fixtures/mainPage';

const elements = [
  {
    locator: {
      loginField: (page) => page.getByRole('textbox', { name: '* Введите номер телефона,' }),
      passworField: (page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
    },
    text: '+375 (30) 000 00 02',
    name: 'phone',
    password: 'gbhjvfy',
  },
  {
    locator: {
      loginField: (page) => page.getByRole('textbox', { name: '* Введите номер телефона,' }),
      passworField: (page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
    },
    text: 'admin',
    name: 'login',
    password: 'gbhjvfy',
  },
  {
    locator: {
      loginField: (page) => page.getByRole('textbox', { name: '* Введите номер телефона,' }),
      passworField: (page) => page.getByRole('textbox', { name: '* Ваш пароль :' }),
    },
    text: 'autotest@whcrm.ru',
    name: 'email',
    password: 'gbhjvfy',
  },
];

test.describe('Тесты способов авторизации работодателя', () => {
  test('Авторизация c помощью смс с лендинга', async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.openAuthModal();
    await mainPage.enterPhoneNumber();
    await mainPage.enterSMSPassword();
    await mainPage.closeMainPage();
  });

  test('Авторизация с помощью пароля с лендинга', async ({ mainPage }) => {
    await mainPage.openMainPage();
    await mainPage.openAuthModal();
    await mainPage.enterPhoneNumber();
    await mainPage.enterLoginPassword();
    await mainPage.closeMainPage();
  });

  test('Авторизация со страницы авторизации ЛК', async ({ authPage }) => {
    try {
      await authPage.openAuthPage();
      for (const { locator, name, text, password } of elements) {
        if (authPage.page.isClosed()) {
          await authPage.enterLogin(locator, name, text, password);
          await authPage.exitLogin();
          await authPage.page.waitForTimeout(1000);
        }
      }
    } catch (error) {
      console.error('Ошибка в тесте:', error);
      throw error;
    }
  });
});

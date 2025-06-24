import { test } from '../fixtures/auth/AuthFixtures';
import { credentials } from '../constants/credentials';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга через SMS `, async ({ landingPage }) => {
    test.slow();
    await test.step('Переход на страницу лендинга', async () => {
      await landingPage.openMainPage();
    });

    await test.step('Открытие модалки авторизации для работодателя', async () => {
      await landingPage.openAuthModal();
    });

    await test.step('Смена кода номера телефона под код страны Беларусь', async () => {
      await landingPage.switchPhoneNumber();
    });

    await test.step('Ввод номера телефона пользователя', async () => {
      await landingPage.fillPhoneNumber(credentials.phone);
    });

    await test.step('Ввод пароля из SMS', async () => {
      await landingPage.enterSMSPassword(credentials.SMSPassword);
      await landingPage.page.waitForTimeout(5000);
    });
  });

  test(`Авторизация со страницы лендинга через Пароль `, async ({ landingPage }) => {
    test.slow();
    await test.step('Переход на страницу лендинга', async () => {
      await landingPage.openMainPage();
    });

    await test.step('Открытие модалки авторизации для работодателя', async () => {
      await landingPage.openAuthModal();
    });

    await test.step('Смена кода номера телефона под код страны Беларусь', async () => {
      await landingPage.switchPhoneNumber();
      await landingPage.page.waitForTimeout(5000);
    });

    await test.step('Ввод номера телефона пользователя', async () => {
      await landingPage.fillPhoneNumber(credentials.phone);
    });

    await test.step('Активация поля для ввода пароля', async () => {
      await landingPage.switchLoginPassword();
    });

    await test.step('Ввод пароля и авторизация пользователя', async () => {
      await landingPage.fillLoginPassword(credentials.password);
      await landingPage.page.waitForTimeout(5000);
    });
  });

  test('Авторизация со страницы ЛК site-login через email', async ({ authPage }) => {
    test.slow();
    await test.step('Открытие страницы авторизации пользователя', async () => {
      await authPage.openAuthPage();
    });

    await test.step('Авторизация с помощью email', async () => {
      await authPage.fillLogin(credentials.email);
      await authPage.fillPassword(credentials.password);
    });

    await test.step('Выход из ЛК', async () => {
      await authPage.exitLogin();
    });
  });

  test('Авторизация со страницы ЛК site-login через логин', async ({ authPage }) => {
    test.slow();
    await test.step('Открытие страницы авторизации пользователя', async () => {
      await authPage.openAuthPage();
    });

    await test.step('Авторизация с помощью login', async () => {
      await authPage.fillLogin(credentials.login);
      await authPage.fillPassword(credentials.password);
    });

    await test.step('Выход из ЛК', async () => {
      await authPage.exitLogin();
    });
  });

  test('Авторизация со страницы ЛК site-login через номер телефона', async ({ authPage }) => {
    test.slow();
    await test.step('Открытие страницы авторизации пользователя', async () => {
      await authPage.openAuthPage();
    });

    await test.step('Авторизация с помощью номера телефона', async () => {
      await authPage.fillLogin(credentials.phone);
      await authPage.fillPassword(credentials.password);
    });

    await test.step('Выход из ЛК', async () => {
      await authPage.exitLogin();
    });
  });
});

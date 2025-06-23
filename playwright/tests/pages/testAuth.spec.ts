import { test } from '../fixtures/mainPage';

test.describe('Тесты авторизации работодателя', () => {
  test(`Авторизация со страницы лендинга`, async ({ landingPage }) => {
    test.slow();
    for (const testCase of landingPage.landingElements) {
      await landingPage.openMainPage();
      await landingPage.openAuthModal(landingPage.landingUIElements);
      await landingPage.enterPhoneNumber(testCase);
      if (testCase.name === 'SMS') {
        await landingPage.enterSMSPassword(testCase);
      } else {
        await landingPage.enterLoginPassword(testCase);
      }
      await landingPage.page.waitForTimeout(5000);
    }
  });

  test('Авторизация со страницы ЛК site-login', async ({ authPage }) => {
    test.slow();
    await authPage.openAuthPage();
    for (const testCase of authPage.authElements) {
      await authPage.enterLogin(testCase);
      await authPage.exitLogin(authPage.authUIElements);
    }
  });
});

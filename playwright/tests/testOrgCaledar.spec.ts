import { test } from '../fixtures/calendarOrganaizer/CalendarOrganaizerFixtures';
import { credentials } from '../constants/credentials';

test.describe('Тесты раздела Ежедневник', () => {
  test(`Тест отображения элементов странцы Ежедневник`, async ({
    authApi,
    orgCalendar,
    context,
  }) => {
    test.slow();
    await test.step('Получение куки', async () => {
      await authApi.loginAndSetCookie({
        context,
        username: credentials.login,
        password: credentials.password,
      });
    });
    await test.step('Переход в раздел Ежедневник', async () => {
      await orgCalendar.gotoPageDaily();
    });
    await test.step('Проверка отображения элементов странциы', async () => {
      await orgCalendar.viewDefaultElementsReminders();
    });
    await test.step('Проверка активности табов', async () => {
      await orgCalendar.clickableTabReminders();
    });
    await test.step('Проверка активности табов', async () => {
      await orgCalendar.clickableStatusReminder();
    });
  });
});

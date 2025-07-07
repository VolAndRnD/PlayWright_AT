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
    await test.step('Проверка активности фильтра по статусам напоминаний', async () => {
      await orgCalendar.clickableStatusReminder();
    });
    await test.step('Проверка активности фильтров дат и менеджеров', async () => {
      await orgCalendar.clickableDailyOrganaizerBlock();
    });
  });

  test(`Тест создания напоминания`, async ({ authApi, orgCalendar, reminderApi, context }) => {
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
    await test.step('Открытие модалки выбора кому создать напоминание', async () => {
      await orgCalendar.ChangeReminderModal.openChangeModal();
    });

    await test.step('Проверка отображения элементов модального окна', async () => {
      await orgCalendar.ChangeReminderModal.viewElementModal();
    });

    await test.step('Проверка активности элементов', async () => {
      await orgCalendar.ChangeReminderModal.clickableElementModal();
    });

    await test.step('Открытие модалки создания напоминания', async () => {
      await orgCalendar.ChangeReminderModal.openCreateModal();
    });

    await test.step('Проверка отображения элементов модального окна', async () => {
      await orgCalendar.CreateReminderModal.viewElementModal();
    });

    await test.step('Проверка активности элементов', async () => {
      await orgCalendar.CreateReminderModal.clicableElementsModal();
    });

    await test.step('', async () => {
      await orgCalendar.CreateReminderModal.createReminder();
    });

    let id: number = await test.step('Создание напоминания', async () => {
      const RemindData = await reminderApi.addReminder();
      const remindId = RemindData.data.uid;
      return remindId;
    });

    await test.step('Удаление напоминания', async () => {
      await reminderApi.deleteReminder(id);
    });
  });
});

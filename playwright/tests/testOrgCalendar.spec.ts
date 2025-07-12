import { test } from '../fixtures/calendarOrganaizer/CalendarOrganaizerFixtures';
import { credentials } from '../constants/credentials';
import { RemindData } from '../typings/reminders/reminders';

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

  test(`Тест создания напоминания с помощью модалки`, async ({ authApi, orgCalendar, context }) => {
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

    await test.step('Создание напоминания через модалку', async () => {
      await orgCalendar.CreateReminderModal.createReminder();
    });
  });

  test(`Тест фильтра типа напоминания `, async ({ authApi, orgCalendar, reminderApi, context }) => {
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
    await test.step('Создание напоминания - встреча', async () => {
      await reminderApi.addReminder();
      // const RemindData1 =
      // console.log(RemindData1);
      // const remindId = RemindData1.data.uid;
      // return remindId;

      // await test.step('Удаление напоминания', async () => {
      //   await reminderApi.deleteReminder(id);

      await orgCalendar.DailyPlannerOrganizer.clickNextDay();
      await orgCalendar.FilterTypeRemind.changeOnlyMeet();
      await orgCalendar.ReminderCard.viewMeetBage();
      await orgCalendar.FilterTypeRemind.changeOnlyComment();
      await orgCalendar.ReminderCard.notViewMeetBage();
    });
  });

  // test('API test', async ({ authApi, reminderApi, context }) => {
  //   await test.step('Получение куки', async () => {
  //     await authApi.loginAndSetCookie({
  //       context,
  //       username: credentials.login,
  //       password: credentials.password,
  //     });
  //   });
  //   await test.step('Получение списка напоминаний', async () => {
  //     const response = await reminderApi.getReminderListDate();
  //     if (!response?.data || !Array.isArray(response.data)) {
  //       throw new Error('Некорректный формат ответа API: ожидался массив в response.data');
  //     }

  //     const reminders: RemindData[] = response.data;
  //     const remindersData = reminders.map((reminder) => ({
  //       id: reminder.uid,
  //       date: reminder.dt_remind,
  //     }));
  //     const validUids = remindersData.filter((reminder) => reminder.id !== undefined);

  //     console.log('All UIDs:', validUids);
  //   });
  // });
});

import { test as base, request } from '@playwright/test';
import { OrgCalendarPage } from '../../pages/organizer-calendar/OrgCalendarPage';
import { AuthEmployer } from '../../api/AuthEmployerApi';
import { RemindersApi } from '../../api/remindersApi';

interface CalendarOrganaizerFixtures {
  authApi: AuthEmployer;
  orgCalendar: OrgCalendarPage;
  reminderApi: RemindersApi;
}

export const test = base.extend<CalendarOrganaizerFixtures>({
  authApi: async ({ request }, use, testInfo) => {
    const authApi = new AuthEmployer(request, testInfo.config);
    await use(authApi);
  },
  orgCalendar: async ({ page }, use) => {
    const orgCalendarPage = new OrgCalendarPage(page);
    await use(orgCalendarPage);
  },
  reminderApi: async ({ request, authApi }, use, testInfo) => {
    const reminderApi = new RemindersApi(request, testInfo.config, authApi);
    await use(reminderApi);
  },
});

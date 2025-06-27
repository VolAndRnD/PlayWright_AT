import { test as base } from '@playwright/test';
import { OrgCalendarPage } from '../../pages/organizer-calendar/OrgCalendarPage';
import { AuthEmployer } from '../../api/AuthEmployerApi';

interface CalendarOrganaizerFixtures {
  authApi: AuthEmployer;
  orgCalendar: OrgCalendarPage;
}

export const test = base.extend<CalendarOrganaizerFixtures>({
  authApi: async ({ request }, use, testInfo) => {
    const authApi = new AuthEmployer(request, testInfo.config);
    await use(authApi);
  },
  orgCalendar: async ({ page }, use) => {
    const authPage = new OrgCalendarPage(page);
    await use(authPage);
  },
});

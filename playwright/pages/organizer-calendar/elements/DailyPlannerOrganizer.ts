import { Locator, Page } from '@playwright/test';

export class DailyPlannerOrganizer {
  readonly dailyPlannerOrganaizerBlock: Locator;
  readonly customDatesOrganizer: Locator;
  readonly prevArrowButton: Locator;
  readonly monthListButtons: Locator;
  readonly nextArrowButton: Locator;
  readonly monthlyReminderPicker: Locator;
  readonly monthlyPickerDropdown: Locator;
  readonly remindersForStaffSelector: Locator;
  readonly employersListDropdown: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.dailyPlannerOrganaizerBlock = this.page.getByTestId('lower-filter-block');
    this.customDatesOrganizer = this.page.getByTestId('custom-dates-organizer');
    this.prevArrowButton = this.page.getByTestId('prev-dates');
    this.monthListButtons = this.page.getByTestId('month-6-list');
    this.nextArrowButton = this.page.getByTestId('next-dates');
    this.monthlyReminderPicker = this.page.getByTestId('monthly-reminder-picker');
    this.monthlyPickerDropdown = this.page.locator(
      '//div[contains(@class, "ant-picker-dropdown ant-picker-dropdown-placement-topLeft")]',
    );
    this.remindersForStaffSelector = this.page.getByTestId('search-select');
    this.employersListDropdown = this.page.getByTestId('text-overflow');
  }
}

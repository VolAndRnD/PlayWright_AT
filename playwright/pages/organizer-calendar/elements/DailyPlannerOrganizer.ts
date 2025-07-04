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
    this.employersListDropdown = this.page
      .getByTestId('2')
      .filter({
        has: this.page.locator(
          '//div[contains(@class, "ant-select-item ant-select-item-option ant-select-item-option-active ant-select-item-option-selected")]',
        ),
      });
  }

  async viewDailyPlanerBlock(): Promise<void> {
    await this.dailyPlannerOrganaizerBlock.isVisible();
    await this.customDatesOrganizer.isVisible();
    await this.prevArrowButton.click();
    await this.nextArrowButton.click();
    await this.monthListButtons.isVisible();
    await this.monthlyReminderPicker.isVisible();
    await this.monthlyReminderPicker.click();
    await this.monthlyPickerDropdown.isVisible();
    await this.page.keyboard.press('Escape');
    await this.remindersForStaffSelector.click();
    await this.employersListDropdown.isVisible();
    await this.page.keyboard.press('Escape');
  }
}

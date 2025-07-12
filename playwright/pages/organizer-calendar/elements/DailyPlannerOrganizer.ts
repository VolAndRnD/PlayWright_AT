import { Locator, Page, expect } from '@playwright/test';
import { format, addDays } from 'date-fns';

export class DailyPlannerOrganizer {
  readonly dailyPlannerOrganaizerBlock: Locator;
  readonly customDatesOrganizer: Locator;
  readonly prevArrowButton: Locator;
  readonly monthListButtons: Locator;
  readonly nextArrowButton: Locator;
  readonly monthlyReminderPicker: Locator;
  readonly monthlyPickerDropdown: Locator;
  readonly remindersForStaffSelector: Locator;
  readonly employersListSelect: Locator;
  readonly employersListDropdown: Locator;
  readonly nextDayNumberButton: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.dailyPlannerOrganaizerBlock = this.page.getByTestId('lower-filter-block');
    this.customDatesOrganizer = this.page.getByTestId('custom-dates-organizer');
    this.prevArrowButton = this.page.getByTestId('prev-dates');
    this.monthListButtons = this.page.getByTestId('month-7-list');
    this.nextArrowButton = this.page.getByTestId('next-dates');
    this.monthlyReminderPicker = this.page.getByTestId('monthly-reminder-picker');
    this.monthlyPickerDropdown = this.page.locator(
      '//div[contains(@class, "ant-picker-dropdown ant-picker-dropdown-placement-topLeft")]',
    );
    this.remindersForStaffSelector = this.page.getByTestId('search-select');
    this.employersListSelect = this.page.locator(
      '//div[@data-testid = "2"][contains(@class,"ant-select-item ant-select-item-option ant-select-item-option-active ant-select-item-option-selected")]',
    );
    this.employersListDropdown = this.employersListSelect.getByTestId('text-overflow');
    this.nextDayNumberButton = this.page.getByTestId('day-number');
  }

  async viewDailyPlanerBlock(): Promise<void> {
    await expect(this.dailyPlannerOrganaizerBlock).toBeVisible();
    await expect(this.customDatesOrganizer).toBeVisible();
    await this.prevArrowButton.click();
    await this.nextArrowButton.click();
    await expect(this.monthListButtons).toBeVisible();
    await expect(this.monthlyReminderPicker).toBeVisible();
    await this.monthlyReminderPicker.click();
    await expect(this.monthlyPickerDropdown).toBeVisible();
    await this.page.keyboard.press('Escape');
    await this.remindersForStaffSelector.click();
    await this.employersListSelect.click();
    await expect(this.employersListDropdown).toHaveText('Автотест Автотестович');
    await this.page.keyboard.press('Escape');
  }

  async clickNextDay(): Promise<void> {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const dayNumber = tomorrow.getDate();
    await this.nextDayNumberButton.filter({ has: this.page.getByText(`${dayNumber}`) }).click();
  }
}

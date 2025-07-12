import { Locator, Page, expect } from '@playwright/test';

export class ReminderCard {
  readonly meetBage: Locator;
  readonly reminderBlock: Locator;
  readonly reminderBlockID: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.meetBage = this.page.getByTestId('title').filter({ hasText: 'Встреча' });
    this.reminderBlock = this.page.getByTestId('reminders-list-block');
    this.reminderBlockID = this.reminderBlock.locator(
      '//div[contains(@class, "reminder-item_active")]',
    );
  }

  async viewMeetBage(): Promise<void> {
    await expect(this.meetBage).toBeVisible();
  }
  async notViewMeetBage(): Promise<void> {
    await expect(this.meetBage).not.toBeVisible();
  }
}

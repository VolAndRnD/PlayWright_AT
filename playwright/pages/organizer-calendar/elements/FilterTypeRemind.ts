import { Locator, Page, expect } from '@playwright/test';

export class FilterTypeRemind {
  readonly commentRemindersSelector: Locator;
  readonly commentReminderDropdown: Locator;
  readonly onlyCommentDropdown: Locator;
  readonly onlyMeetDropdown: Locator;
  readonly notFilterDropdown: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.commentRemindersSelector = this.page.getByTestId('filter-comment-type');
    this.commentReminderDropdown = this.page.locator(
      '//div[contains(@class, "rc-virtual-list-holder-inner")]',
    );
    this.onlyCommentDropdown = this.commentReminderDropdown.getByTitle('Только комментарии');
    this.onlyMeetDropdown = this.commentReminderDropdown.getByTitle('Только встречи');
    this.notFilterDropdown = this.commentReminderDropdown.getByTitle('Нет фильтра');
  }
  async changeOnlyComment(): Promise<void> {
    await this.commentRemindersSelector.click();
    await this.onlyCommentDropdown.click();
  }

  async changeOnlyMeet(): Promise<void> {
    await this.commentRemindersSelector.click();
    await this.onlyMeetDropdown.click();
  }

  async changeNotFilter(): Promise<void> {
    await this.commentRemindersSelector.click();
    await this.notFilterDropdown.click();
  }
}

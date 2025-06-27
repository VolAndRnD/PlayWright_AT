import { Locator, Page } from '@playwright/test';

export class StatusRemindersSelector {
  readonly statusRemindersDropdown: Locator;
  readonly statusOverdueDropdown: Locator;
  readonly statusWaitingDropdown: Locator;
  readonly statusFulfilledDropdown: Locator;
  readonly statusCurrentDropdown: Locator;
  readonly statusTransferredDropdown: Locator;
  readonly statusCanceledDropdown: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.statusRemindersDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Все события', { exact: false }) });

    this.statusOverdueDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Просроченные', { exact: false }) });
    this.statusWaitingDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Ожидающие', { exact: false }) });

    this.statusFulfilledDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Исполненные', { exact: false }) });
    this.statusCurrentDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Актуальные', { exact: false }) });
    this.statusTransferredDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Перенесённые', { exact: false }) });
    this.statusCanceledDropdown = this.page
      .locator(
        '//div[contains(@class,"ant-select-dropdown ant-select-dropdown-placement-bottomLeft ")]',
      )
      .filter({ has: this.page.getByText('Отменённые', { exact: false }) });
  }

  async viewDropdownElements(): Promise<void> {
    await this.statusRemindersDropdown.isVisible();
    await this.statusOverdueDropdown.isVisible();
    await this.statusWaitingDropdown.isVisible();
    await this.statusFulfilledDropdown.isVisible();
    await this.statusCurrentDropdown.isVisible();
    await this.statusTransferredDropdown.isVisible();
    await this.statusCanceledDropdown.isVisible();
  }
}

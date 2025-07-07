import { Page, Locator, expect } from '@playwright/test';

export class ChangeReminderModal {
  readonly addReminderButton: Locator;
  readonly modalHeader: Locator;
  readonly searchInput: Locator;
  readonly leadTab: Locator;
  readonly clientTab: Locator;
  readonly containerTabpanel: Locator;
  readonly containerTabpanelActive: Locator;
  readonly arrowStatusButton: Locator;
  readonly contentBox: Locator;
  readonly addButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.addReminderButton = this.page.getByTestId('add-reminder');
    this.modalHeader = this.page
      .getByTestId('dialog-header')
      .filter({ hasText: 'Выберите лида/клиента' });
    this.searchInput = this.page.getByPlaceholder('Введите для поиска');
    this.leadTab = this.page.getByRole('tab').filter({ hasText: 'Лиды' });
    this.clientTab = this.page.getByRole('tab').filter({ hasText: 'Клиенты' });

    this.contentBox = this.page.locator(
      '//div[contains(@class, "ant-tabs-tabpane ant-tabs-tabpane-active")]',
    );
    this.containerTabpanel = this.contentBox.locator(
      '//div[contains(@class,"ant-collapse-item ant-collapse-no-arrow")]',
    );
    this.containerTabpanelActive = this.contentBox.locator(
      '//div[contains(@class,"styles-collapse-client-header-title-selected__cNcHB")]',
    );
    this.arrowStatusButton = this.contentBox.getByTestId('interview_status_arrow_down_icon');
    this.addButton = this.page.getByRole('button').filter({ hasText: 'Добавить' });
    this.cancelButton = this.page.getByRole('button').filter({ hasText: 'Отмена' });
    this.closeButton = this.page.getByTestId('close-dialog');
  }

  async openChangeModal() {
    await this.addReminderButton.click();
  }

  async viewElementModal() {
    await expect(this.modalHeader).toHaveText('Выберите лида/клиента');
    await expect(this.searchInput).toBeVisible();
    await expect(this.leadTab).toHaveAttribute('aria-selected', 'true');
    await expect(this.addButton).toBeDisabled();
    await expect(this.cancelButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  async clickableElementModal() {
    await this.clientTab.click();
    await expect(this.leadTab).toHaveAttribute('aria-selected', 'false');
    await this.containerTabpanel.click();
    await this.arrowStatusButton.click();
    await expect(this.contentBox).toBeVisible();
    await expect(this.addButton).toBeEnabled();
  }

  async openCreateModal() {
    if (!(await this.containerTabpanelActive.isVisible())) {
      await this.containerTabpanel.click();
    }
    await this.addButton.click();
  }
}

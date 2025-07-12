import { Page, Locator } from '@playwright/test';
import { DailyPlannerOrganizer } from './elements/DailyPlannerOrganizer';
import { StatusRemindersSelector } from './elements/StatusReminderSelector';
import { ChangeReminderModal } from './elements/ChangeReminderModal';
import { CreateReminderModal } from './elements/CreateReminderModal';
import { FilterTypeRemind } from './elements/FilterTypeRemind';
import { ReminderCard } from './elements/ReminderCard';

export class OrgCalendarPage {
  readonly allListRemindersTab: Locator;
  readonly favoriteRemindersTab: Locator;
  readonly searchRemindersField: Locator;
  readonly statusRemindersSelector: Locator;
  readonly commentRemindersSelector: Locator;
  readonly resetFiltersButton: Locator;
  readonly currentDayBlock: Locator;
  readonly reminderEmptyBlock: Locator;

  readonly DailyPlannerOrganizer: DailyPlannerOrganizer;
  readonly StatusRemindersSelector: StatusRemindersSelector;
  readonly ChangeReminderModal: ChangeReminderModal;
  readonly CreateReminderModal: CreateReminderModal;
  readonly FilterTypeRemind: FilterTypeRemind;
  readonly ReminderCard: ReminderCard;

  constructor(public readonly page: Page) {
    this.page = page;
    this.allListRemindersTab = this.page.getByTestId('all-list-remidenders');
    this.favoriteRemindersTab = this.page.getByTestId('favourite-reminders');
    this.searchRemindersField = this.page
      .getByTestId('serach-input')
      .filter({ hasText: 'Введите текст для поиска' });
    this.statusRemindersSelector = this.page.getByTestId('search-select-field');
    this.commentRemindersSelector = this.page.getByTestId('filter-comment-type');
    this.resetFiltersButton = this.page.getByTestId('reset-filters');
    this.currentDayBlock = this.page.getByTestId('current-day');
    this.reminderEmptyBlock = this.page.getByTestId('reminder-empty-block');

    this.StatusRemindersSelector = new StatusRemindersSelector(this.page);
    this.DailyPlannerOrganizer = new DailyPlannerOrganizer(this.page);
    this.CreateReminderModal = new CreateReminderModal(this.page);
    this.ChangeReminderModal = new ChangeReminderModal(this.page);
    this.FilterTypeRemind = new FilterTypeRemind(this.page);
    this.ReminderCard = new ReminderCard(this.page);
  }
  async gotoPageDaily(): Promise<void> {
    await this.page.goto('/organizer-calendar');
    await this.page.waitForLoadState('networkidle');
  }

  async viewDefaultElementsReminders(): Promise<void> {
    await this.allListRemindersTab.getByText('Весь список напоминаний');
    await this.favoriteRemindersTab.getByText('Избранные напоминания');
    await this.searchRemindersField.getByPlaceholder('Введите текст для поиска');
    await this.statusRemindersSelector
      .filter({ has: this.page.getByText('Все события', { exact: false }) })
      .textContent();
    await this.commentRemindersSelector.filter({ has: this.page.getByTitle('Нет фильтра') });
    await this.resetFiltersButton.isVisible();
    await this.currentDayBlock.filter({ has: this.page.getByText('Сегодня') });
    await this.reminderEmptyBlock?.isVisible();
  }

  async clickableTabReminders(): Promise<void> {
    await this.favoriteRemindersTab.click();
    await this.allListRemindersTab.click();
  }
  async clickableStatusReminder(): Promise<void> {
    await this.statusRemindersSelector.click();
    await this.StatusRemindersSelector.statusRemindersDropdown.waitFor({
      state: 'visible',
    });
    await this.StatusRemindersSelector.viewDropdownElements();
    await this.page.keyboard.press('Escape');
  }

  async clickableDailyOrganaizerBlock(): Promise<void> {
    await this.DailyPlannerOrganizer.viewDailyPlanerBlock();
  }
}

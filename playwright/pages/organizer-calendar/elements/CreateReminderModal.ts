import { Page, Locator, expect } from '@playwright/test';
import { format, addDays } from 'date-fns';

export class CreateReminderModal {
  readonly customHeader: Locator;
  readonly commentTab: Locator;
  readonly commentField: Locator;
  readonly reminderCheckbox: Locator;
  readonly reminderUserSelect: Locator;
  readonly creatorButton: Locator;
  readonly dateBox: Locator;
  readonly dateField: Locator;
  readonly hourField: Locator;
  readonly minuteField: Locator;
  readonly tommorowButton: Locator;
  readonly tommorowDpropdown: Locator;
  readonly afterWeekendsTommorowDropdown: Locator;
  readonly weekDayTommorowDropdown: Locator;
  readonly afterTommorowButton: Locator;
  readonly afterTommorowDropdown: Locator;
  readonly afterWeekendsAfterTommorowDropdown: Locator;
  readonly weekDayAfterTommorowDropdown: Locator;
  readonly afterWeekButton: Locator;
  readonly tenHoursButton: Locator;
  readonly twelveHoursButton: Locator;
  readonly fourteenHoursButton: Locator;
  readonly addCommentButton: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.customHeader = this.page.getByTestId('custom-dialog-header');
    this.commentTab = this.page.getByRole('tab').filter({ hasText: 'Комментарии' });
    this.commentField = this.page.getByPlaceholder('Введите текст комментария');
    this.reminderCheckbox = this.page.getByTestId('caption-remind-switch');
    this.reminderUserSelect = this.page.getByTestId('remind-user');
    this.creatorButton = this.page.getByTestId('creator');
    this.dateBox = this.page.getByTestId('date-field');
    this.dateField = this.dateBox.getByTestId('date-picker');
    this.hourField = this.page.getByTestId('hour');
    this.minuteField = this.page.getByTestId('minute');
    this.tommorowButton = this.page.getByTestId('tommorow-field');
    this.tommorowDpropdown = this.page.getByTestId('tommorow-field-overlay');
    this.afterWeekendsTommorowDropdown = this.tommorowDpropdown.getByTestId('after-weekends');
    this.weekDayTommorowDropdown = this.tommorowDpropdown.getByTestId('week-day');
    this.afterTommorowButton = this.page.getByTestId('day-after-tommorow-field');
    this.afterTommorowDropdown = this.page.getByTestId('day-after-tommorow-field-overlay');
    this.afterWeekendsAfterTommorowDropdown =
      this.afterTommorowDropdown.getByTestId('after-weekends');
    this.weekDayAfterTommorowDropdown = this.afterTommorowDropdown.getByTestId('week-day');
    this.afterWeekButton = this.page.getByTestId('in-seven-days-field');
    this.tenHoursButton = this.page.getByTestId('ten-field');
    this.twelveHoursButton = this.page.getByTestId('twelve-field');
    this.fourteenHoursButton = this.page.getByTestId('fourteen-field');
    this.addCommentButton = this.page
      .getByRole('button')
      .filter({ hasText: 'Добавить комментарий' });
  }

  async viewElementModal() {
    await expect(this.customHeader).toBeVisible();
    await expect(this.commentTab).toHaveAttribute('aria-selected', 'true');
    await expect(this.reminderCheckbox).toBeDisabled();
    // await expect(this.reminderUserSelect).toBeVisible();
    await expect(this.creatorButton).toHaveText('Имя создателя сделки');

    let today = new Date();
    let formattedDate = format(today, 'dd.MM.yyyy');
    console.log(formattedDate);
    await expect(this.dateField).toHaveAttribute('value', formattedDate);

    let now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    let futureHours = String(now.getHours()).padStart(2, '0');
    let futureMinutes = String(now.getMinutes()).padStart(2, '0');

    await expect(this.hourField).toHaveAttribute('value', futureHours);
    await expect(this.minuteField).toHaveAttribute('value', futureMinutes);
  }

  async clicableElementsModal() {
    await this.tommorowButton.click();

    if (await this.afterWeekendsTommorowDropdown.isVisible()) {
      await this.afterWeekendsTommorowDropdown.click();
      const today = new Date();
      const afterWeekTommorow = addDays(today, 3);
      const formattedafterWeekTommorow = format(afterWeekTommorow, 'dd.MM.yyyy');
      await expect(this.dateField).toHaveAttribute('value', formattedafterWeekTommorow);
      await this.tommorowButton.click();
    }
    if (await this.weekDayTommorowDropdown.isVisible()) {
      await this.weekDayTommorowDropdown.click();
      const today = new Date();
      const weekDayTomorrow = addDays(today, 1);
      const formattedWeekDayTommorow = format(weekDayTomorrow, 'dd.MM.yyyy');
      await expect(this.dateField).toHaveAttribute('value', formattedWeekDayTommorow);
    }

    const today = new Date();
    const tomorrow = addDays(today, 1);
    const formattedTommorow = format(tomorrow, 'dd.MM.yyyy');
    await expect(this.dateField).toHaveAttribute('value', formattedTommorow);

    await this.afterTommorowButton.click();

    if (await this.afterWeekendsAfterTommorowDropdown.isVisible()) {
      await this.afterWeekendsAfterTommorowDropdown.click();
      const today = new Date();
      const afterWeekAfterTommorow = addDays(today, 3); //Уточнить, почему послезавтра - после выходных имеет такое же значение, что и завтра - после выходных
      const formattedAfterWeekAfterTommorow = format(afterWeekAfterTommorow, 'dd.MM.yyyy');
      await expect(this.dateField).toHaveAttribute('value', formattedAfterWeekAfterTommorow);
      await this.afterTommorowButton.click();
    }
    if (await this.weekDayAfterTommorowDropdown.isVisible()) {
      await this.weekDayAfterTommorowDropdown.click();
      const today = new Date();
      const weekDayAfterTomorrow = addDays(today, 2);
      const formattedWeekDayAfterTommorow = format(weekDayAfterTomorrow, 'dd.MM.yyyy');
      await expect(this.dateField).toHaveAttribute('value', formattedWeekDayAfterTommorow);
    }

    const afterTommorow = addDays(today, 2);
    const formattedAfterTommorow = format(afterTommorow, 'dd.MM.yyyy');
    await expect(this.dateField).toHaveAttribute('value', formattedAfterTommorow);

    await this.afterWeekButton.click();
    const afterWeek = addDays(today, 7);
    const formattedAfterWeek = format(afterWeek, 'dd.MM.yyyy');
    await expect(this.dateField).toHaveAttribute('value', formattedAfterWeek);

    if (await this.tenHoursButton.isEnabled()) {
      await this.tenHoursButton.click();
      await expect(this.hourField).toHaveAttribute('value', '10');
      await expect(this.minuteField).toHaveAttribute('value', '00');
    }

    if (await this.twelveHoursButton.isEnabled()) {
      await this.twelveHoursButton.click();
      await expect(this.hourField).toHaveAttribute('value', '12');
      await expect(this.minuteField).toHaveAttribute('value', '00');
    }

    if (await this.fourteenHoursButton.isEnabled()) {
      await this.fourteenHoursButton.click();
      await expect(this.hourField).toHaveAttribute('value', '14');
      await expect(this.minuteField).toHaveAttribute('value', '00');
    }

    await this.commentField.click();
    await this.commentField.fill('reminderTest');
    await expect(this.commentField).toHaveText('reminderTest');
  }
  async createReminder() {
    await this.addCommentButton.click();
  }
}

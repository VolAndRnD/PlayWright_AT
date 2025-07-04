import dayjs from 'dayjs';

export const getTodayDateTime = (): string => {
  return dayjs().format('DD.MM.YYYY');
};

export const getDateTime = (): string => {
  const now = new Date();
  const addHours = 3 * 60 * 60 * 1000;
  const dateTime = new Date(now.getTime() + addHours);

  return dateTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

export const stubReminderCreate = () => {
  const setTodayDateTime = getTodayDateTime();
  const setTimeReminde = getDateTime();
  return {
    B: 255,
    G: 255,
    R: 255,
    comm_text: 'напоминание1',
    deal_uid: null,
    dt_complete: null,
    dt_remind: setTodayDateTime,
    entity_table: 'expr_clients_real',
    isLiked: false,
    mango_call_entry_id: null,
    name_confirmer: null,
    name_creator: 'Admin',
    remind_name_user: 'Admin',
    remind_uid_user: 2,
    reminder: null,
    sended_email: null,
    tm_complete: null,
    tm_remind: setTimeReminde,
    type_uid: 1,
    uid_client: 2,
    uid_creator: 2,
  };
};

export const stubReminderDelete = () => {
  return {
    dt_complete: null,
    dt_remind: null,
    remind_name_user: null,
    remind_uid_user: null,
    reminder: null,
    tm_complete: null,
    tm_remind: null,
  };
};

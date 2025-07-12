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
  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  const setAfterDayDateTime = tomorrow.format('DD.MM.YYYY');
  console.log(setAfterDayDateTime);
  const setTimeReminde = getDateTime();
  return {
    B: 255,
    G: 255,
    R: 255,
    comm_text: 'напоминание1',
    deal_uid: null,
    dt_complete: null,
    dt_remind: setAfterDayDateTime,
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
    type_uid: 2,
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

export const stubReminderList = () => {
  const now = new Date();
  // Дата начала месяца (первое число)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Дата конца месяца (последнее число)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formattedStart = dayjs(startOfMonth).format('YYYY-MM-DD');
  const formattedEnd = dayjs(endOfMonth).format('YYYY-MM-DD');
  return {
    filter: {
      and: [
        {
          dt_remind: { gte: formattedStart, lte: formattedEnd },
        },
        { dt_complete: null },
        {
          or: [{ uid_creator: 2 }, { remind_uid_user: 2 }],
        },
        { not: { bd_name: 'ops_real_clients' } },
      ],
    },
    fields: 'dt_remind',
  };
};

export const stubReminderListDate = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formattedStart = dayjs(startOfMonth).format('YYYY-MM-DD');
  const formattedEnd = dayjs(endOfMonth).format('YYYY-MM-DD');
  return {
    expand:
      'likeCommentExists,reminderUserInfo,creatorUserInfo,deal.kanbanColumn,expressClient,type_uid,candidate,candidate.avatarOriginal,candidate.age,candidate.commentsCount,candidate.responsesVacancies,candidate.imported,candidate.canViewPhoneWithoutLimit,candidate.desiredPositions,candidate.interviews,candidate.interviews.status,candidate.interviews.manager,candidate.interviews.vacancy,lk_partner,candidate.interviews.employerRejectReason',
    fields:
      '*,expressClient.type,expressClient.ex_name,expressClient.client_stts,expressClient.uid,likeCommentExists,reminderUserInfo,creatorUserInfo,deal.kanbanColumn,expressClient,type_uid',
    filter: {
      and: [
        {
          dt_remind: { gte: formattedStart, lte: formattedEnd },
        },
        { dt_complete: null },
        {
          or: [{ uid_creator: 2 }, { remind_uid_user: 2 }],
        },
        { not: { bd_name: 'ops_real_clients' } },
      ],
    },
    page: 1,
    'per-page': 100,
    sort: '-uid',
  };
};

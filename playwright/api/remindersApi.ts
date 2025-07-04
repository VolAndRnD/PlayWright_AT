import { APIRequestContext, APIResponse, FullConfig } from '@playwright/test';
import { AuthEmployer } from './AuthEmployerApi';
import { stubReminderCreate, stubReminderDelete } from '../stubs/reminders/reminderStub';
import { CreateRemindResponse } from '../typings/reminders/reminders';
import { BaseApi } from '../api/baseApi';

export class RemindersApi extends BaseApi {
  private readonly baseURL: string;

  constructor(
    protected readonly request: APIRequestContext,
    config: FullConfig,
    private readonly authApi: AuthEmployer,
  ) {
    super(request, () => authApi.accessToken);
    this.baseURL = config.projects[0].use.baseURL!;
  }

  async addReminder(): Promise<CreateRemindResponse> {
    if (!this.authApi.accessToken) {
      throw new Error('Authentication token is not available');
    }

    const params = {
      expand:
        'likeCommentExists,reminderUserInfo,creatorUserInfo,deal.kanbanColumn,expressClient,type_uid',
      fields:
        '*,expressClient.type,expressClient.ex_name,expressClient.client_stts,expressClient.uid,likeCommentExists,reminderUserInfo,creatorUserInfo,deal.kanbanColumn,expressClient,type_uid',
      'access-token': this.authApi.accessToken,
    };

    const apiUrl = `http://api.1464.release.macroncrm.ru/comment/create`;
    const payload = stubReminderCreate();

    const response: CreateRemindResponse = await this.requestWithAuth('post', apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params,
      data: payload,
      timeout: 2000,
    });
    return response;
  }

  async deleteReminder(id: number) {
    if (!this.authApi.accessToken) {
      throw new Error('Authentication token is not available');
    }

    const params = {
      id: id,
      expand: '',
      fields:
        '*,expressClient.type,expressClient.ex_name,expressClient.client_stts,expressClient.uid,likeCommentExists,reminderUserInfo,creatorUserInfo,deal.kanbanColumn,expressClient,type_uid',
      'access-token': this.authApi.accessToken,
    };

    const apiUrl = `http://api.1464.release.macroncrm.ru/comment/update`;
    const payload = stubReminderDelete();

    return this.request.post(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params,
      data: payload,
      timeout: 2000,
    });
  }
}

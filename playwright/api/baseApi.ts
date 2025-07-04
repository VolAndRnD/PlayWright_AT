import { APIRequestContext } from '@playwright/test';

/**
 * Базовый класс для CRM API.
 * Инкапсулирует общую логику авторизационных запросов.
 */
export abstract class BaseApi {
  constructor(
    protected readonly request: APIRequestContext,
    protected readonly getToken: () => string,
  ) {}

  protected async requestWithAuth<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options: Record<string, any> = {},
  ): Promise<T> {
    const params = {
      ...options.params,
      'access-token': this.getToken(),
    };

    const response = await this.request[method](url, {
      ...options,
      params,
    });

    if (!response.ok()) {
      throw new Error(`Ошибка запроса API: ${response.statusText()}`);
    }

    return response.json();
  }
}

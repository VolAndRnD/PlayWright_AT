import { APIRequestContext, BrowserContext, FullConfig } from '@playwright/test';
import { credentials } from '../constants/credentials';

export class AuthEmployer {
  private token: string | null = null;
  private readonly baseURL: string;

  constructor(private readonly request: APIRequestContext, config: FullConfig) {
    this.baseURL = config.projects[0].use.baseURL!;
  }

  get accessToken(): string {
    if (!this.token) {
      throw new Error('Токен не установлен. Пожалуйста, выполните вход.');
    }
    return this.token;
  }

  async loginAndSetCookie({
    context,
    username = credentials.email,
    password = credentials.password,
  }: {
    context: BrowserContext;
    username?: string;
    password?: string;
  }) {
    try {
      const response = await this.request.post('/api/auth/login', {
        params: {
          _suppress_response_codes: '1',
          expand: 'partner.partnerHhConfig',
        },
        data: {
          user: username,
          password: password,
        },
      });

      if (response.ok()) {
        const data = await response.json();
        this.token = data.data.token;

        if (!this.token || this.token === '') {
          throw new Error('Токен не получен при авторизации. Проверьте учетные данные.');
        }

        const domain = new URL(this.baseURL).hostname;

        const tokenCookie = {
          name: 'accessToken',
          value: this.token,
          domain,
          path: '/',
        };
        const rawCookies = response
          .headersArray()
          .filter((header) => header.name.toLowerCase() === 'set-cookie');

        const cookies = rawCookies.map((header) => this.parseSetCookieHeader(header.value));

        await context.addCookies([...cookies, tokenCookie]);
      } else {
        throw new Error(`Ошибка авторизации: ${response.statusText()}`);
      }
    } catch (error) {
      console.error(
        `[AuthEmployerApi] Ошибка при авторизации: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      throw error;
    }
  }

  private parseSetCookieHeader(setCookieHeader: string) {
    const domain = new URL(this.baseURL).hostname;
    const [cookiePart, ...attributes] = setCookieHeader.split(';').map((part) => part.trim());
    const [name, value] = cookiePart.split('=');
    const cookie = {
      name,
      value,
      domain,
      path: '/',
      secure: false,
      httpOnly: false,
    };

    attributes.forEach((attr) => {
      const [attrName, attrValue] = attr.split('=');
      switch (attrName.toLowerCase()) {
        case 'domain':
          cookie.domain = attrValue;
          break;
        case 'path':
          cookie.path = attrValue || '/';
          break;
        case 'secure':
          cookie.secure = true;
          break;
        case 'httponly':
          cookie.httpOnly = true;
          break;
      }
    });

    return cookie;
  }
}

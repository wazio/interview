import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

export interface FakeResponse {
  id: number;
  email: string;
  firstName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public logIn(email: string, password: string): Observable<FakeResponse> {
    return this.httpClient.post<FakeResponse>('https://hub.cobiro.com/v1/login', {
      payload: {
        data: {
          type: 'login',
          attributes: { email, password },
        },
      },
    });
  }
}

import { Injectable } from '@angular/core';
import { AuthService, FakeResponse } from '../services/auth.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  public user$: Observable<User>;
  private userEmitter$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
    this.user$ = this.userEmitter$.asObservable();
  }

  public logIn(email: string, password: string): Observable<User> {
    return this.authService.logIn(email, password).pipe(
      map((response: FakeResponse) => new User(response.id, response.email, response.firstName)),
      tap((user: User) => this.userEmitter$.next(user))
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';

export class User {
  id?: string;
  email?: string;
  isActivated?: boolean;
  password?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }

  currentUser: User = new User();

  backUrlRegist = this.backEndRegistration;

  backUrlLogin = this.backEndLogin;

  backUrlCheckUsers = this.backEndUsers;

  private token: any = null;

  public loginList = new BehaviorSubject<any>([]);

  items: any[] = [];

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.backUrlRegist, user);
  }

  loginUser(user: any): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(this.backUrlLogin, user)
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem('auth-token', accessToken);
          this.setToken(accessToken);
          this.setCurrentUser();
        })
      );
  }

  addLoginName(value: any) {
    this.items.push(value);
    this.loginList.next(value);
  }

  setCurrentUser(): User {
    return this.currentUser;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string {
    this.loginList.next(this.items);
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

  getAuthProfile(): Observable<any> {
    return this.http.get<any>(this.backUrlCheckUsers);
  }

  // login(user: User): Observable<{ token: string }> {
  //   return this.http
  //     .post<{ token: string }>('localhost:7000/api/login', user)
  //     .pipe(
  //       tap(({ token }) => {
  //         localStorage.setItem('auth-token', token);
  //         this.setToken(token);
  //       })
  //     );
  // }

  // setToken(token: string | null) {
  //   this.token = token;
  // }

  getAuth(): Observable<any> {
    return this.http.get(this.backUrlRegist);
  }

  // logout() {
  //   this.setToken(null);
  //   localStorage.clear();
  // }
}

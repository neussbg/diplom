import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenInterceptor } from 'src/app/auth/token-interceptor';
import { BaseApiService } from './base-api.service';

export class User {
  id?: string;
  email?: string;
  isActivated?: boolean;
  password?: string;
}

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const TOKEN_KEY = 'AuthToken';

export interface UserInfo {
  email?: string;
  isActivated?: boolean;
  password?: string;
  role: ROLE;
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

  private role: any = null;

  public loginList = new BehaviorSubject<any>([]);

  items: any[] = [];

  registration(user: User): Observable<User> {
    return this.http.post<User>(this.backUrlRegist, user);
  }

  loginUser(user: any): Observable<{ refreshToken: string }> {
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/json',
      Authorization: '',
    });
    return this.http
      .post<{ refreshToken: string }>(this.backUrlLogin, user)
      .pipe(
        tap(({ refreshToken }) => {
          localStorage.setItem(TOKEN_KEY, refreshToken);
          // localStorage.setItem('auth-role', refreshToken.role);
          this.setToken(refreshToken);
          // this.setRole(user.role);
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

  // getToken(): string {
  //   this.loginList.next(this.items);
  //   return this.token;
  // }

  //   public isAuthenticated():boolean {
  // return this.getToken();
  //   }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) as string;
  }

  setRole(role: string | null) {
    this.role = role;
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

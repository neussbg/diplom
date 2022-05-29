import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from 'src/assets/interfaces/auth/user.interface';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }
  backUrlRegist = this.backEndRegistration;

  backUrlLogin = this.backEndLogin;

  private token: any = null;

  registration(user: any): Observable<any> {
    return this.http.post<any>(this.backUrlRegist, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this.backUrlLogin, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>('localhost:7000/api/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  getAuth(): Observable<any> {
    return this.http.get(this.backUrlRegist);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}

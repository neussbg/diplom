import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from 'src/app/auth/jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignupInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthizationService {
  private loginUrl = 'http://localhost:7000/api/user/login';
  private signupUrl = 'http://localhost:7000/api/user/registration';

  attemptAuth(creditals: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, creditals, httpOptions);
  }

  sighUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) {}
}

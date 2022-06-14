import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

const USERNAME_KEY = 'AuthUserName';

const AUTHORITES_KEY = 'AuthAuthproties';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  private roles: Array<string> = [];
  sightOut() {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) as string;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY) as string;
  }

  public saveAuthorities(authorities: string[]) {
    console.log('saveAuthorities');
    console.log(authorities);
    window.sessionStorage.removeItem(AUTHORITES_KEY);
    window.sessionStorage.setItem(AUTHORITES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      console.log('test');
      console.log(sessionStorage.getItem(AUTHORITES_KEY));
      JSON.parse(sessionStorage.getItem(AUTHORITES_KEY) as string).forEach(
        (auth: any) => {
          this.roles.push(auth);
        }
      );
    }
    return this.roles;
  }
}

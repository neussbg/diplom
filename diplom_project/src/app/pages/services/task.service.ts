import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, tap, mapTo } from 'rxjs';
export const ENVIRONMENT = new InjectionToken<{ [key: string]: any }>(
  'environment'
);

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly ROOT_URL;
  private readonly environment: any;

  private configuration: any = {};

  constructor(
    @Optional() @Inject(ENVIRONMENT) environment: any,
    private http: HttpClient
  ) {
    this.ROOT_URL = 'http/localhost:7000/api';
  }

  load(): Observable<void> {
    return this.http.get('/assets/config/proxy.conf.json').pipe(
      tap((configuration: any) => (this.configuration = configuration)),
      mapTo(undefined)
    );
  }

  getValue(key: string, defaultValue?: any): any {
    return this.configuration[key] || defaultValue;
  }

  getValueWithEnvironment(key: string, defaultValue?: any): any {
    return this.environment[key] || defaultValue;
  }

  get() {
    return this.http.get(this.ROOT_URL);
  }
}

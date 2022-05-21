import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable, tap, mapTo } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
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
    const root = environment.apiUrl;
    this.ROOT_URL = `${root}/device`;
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

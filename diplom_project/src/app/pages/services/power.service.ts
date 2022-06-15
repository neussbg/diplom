import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface IPower {
  id?: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
@Injectable({
  providedIn: 'root',
})
export class PowerService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }

  getPowers(): Observable<any> {
    return this.http.get<any>(this.backEndPowers);
  }

  createPower(item: IPower): Observable<any> {
    return this.http.post<IPower>(this.backEndPowers, item);
  }

  deletePower(id: number) {
    const url = this.backEndPowers;
    return this.http.delete(`${url}/${id}`);
  }

  updatePower(id: number, item: IPower): Observable<any> {
    return this.http.put<any>(`${this.backEndPowers}/${id}`, item);
  }
}

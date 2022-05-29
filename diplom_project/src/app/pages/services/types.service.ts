import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class TypesService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }
  private typeController = this.backEndTypeController;

  getTypes() {
    return this.http.get(this.typeController);
  }
}

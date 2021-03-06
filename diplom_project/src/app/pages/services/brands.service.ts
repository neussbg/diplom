import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBrand } from 'src/app/components/category-settings/category-settings.component';
import { BaseApiService } from './base-api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }

  brandId = new BehaviorSubject<any>([]);

  private brandController = this.backEndBrandsController;

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.brandController);
  }

  addBrand(item: any): Observable<IBrand> {
    const url = this.brandController;
    return this.http.post<IBrand>(url, item, httpOptions);
  }

  deleteBrand(id: number) {
    const url = this.brandController;
    return this.http.delete(`${url}/${id}`);
  }

  updateBrand(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.brandController}/${id}`, item);
  }
}

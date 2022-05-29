import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { environment } from 'src/environments/environment.prod';
import { BaseApiService } from './base-api.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  rating?: number;
  img?: string;
}

export interface ItemsCount<T> {
  count: number;
  rows: T[];
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseApiService {
  private formUrl = 'https://formspree.io/f/mnqwwand';
  private headers = new HttpHeaders({ 'content-type': 'application/json' });

  private deviceController = this.backEndDeviceController;

  private _refreshNeeds$ = new Subject<void>();

  get refreshNeeds() {
    return this._refreshNeeds$;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getDevices(): Observable<ItemsCount<Product>> {
    return this.http.get(this.deviceController) as Observable<
      ItemsCount<Product>
    >;
  }

  getDevicesById(id: number) {
    return this.http.get<ItemsCount<Product[]>>(
      `${this.deviceController}/${id}`
    );
  }

  getAvailableDevice(id: any): Observable<any> {
    return this.http.get<any>(`${this.deviceController}/${id}`);
    // return this.http
    //   .get<ItemsCount<Product>>(this.deviceController, id)
    //   .pipe(catchError((resp) => this.logErrors(resp)));
  }

  /**
   * Логирует и возвращает ошибку с api
   * @param resp - ответ сервера
   */
  protected logErrors(resp: HttpErrorResponse): Observable<never> {
    console.error(resp.message);
    return throwError(resp);
  }

  deleteDevice(id: number) {
    const url = this.deviceController;
    return this.http.delete<ItemsCount<Product[]>>(`${url}/${id}`);
  }

  addDevice(device: Product): Observable<ItemsCount<Product>> {
    const url = this.deviceController;
    return this.http.post<ItemsCount<Product>>(url, device, httpOptions);
  }

  createDevice(device: Product): Observable<ItemsCount<Product>> {
    const url = this.deviceController;
    return this.http.post<ItemsCount<Product>>(url, device, httpOptions).pipe(
      tap(() => {
        this._refreshNeeds$.next();
      })
    );
  }

  updateDevice(item: number) {
    const url = this.deviceController;
    return this.http.put(url, item);
  }

  sendEmail(contact: any): Observable<any> {
    return this.http
      .post<any>(
        this.formUrl,
        {
          email: contact.email,
        },
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap((_) => console.warn('sending message')),
        catchError(this.handleError<any>('sendEmail', []))
      );
  }

  // updateProduct(item: ProductCard): Observable<ProductCard> {
  //   return this.http.put<ProductCard>(this.controller, item, httpOptions);
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

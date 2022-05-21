import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { environment } from 'src/environments/environment.prod';
import { BaseApiService } from './base-api.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  brandId: number;
  typeId: number;
  info: string;
  rating: number;
  img: string;
}

export interface Response<T> {
  count: number;
  rows: T;
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

  /** Мок данных товара */
  // private controller = 'http://localhost:3000/conditioners';

  private deviceController = this.backEndDeviceController;

  // states$: Observable<ProductCard[]>;

  devices$: Observable<Response<Product[]>>;

  id!: number;

  constructor(private http: HttpClient) {
    super();
    // this.states$ = this.getProducts();
    this.devices$ = this.getDevices();
    this.http.get(this.deviceController);
  }

  getDevices(): Observable<any> {
    return this.http.get<Response<Product[]>>(this.deviceController);
  }

  getDevicesById(id: number) {
    return this.http.get<Response<Product[]>>(`${this.deviceController}/${id}`);
  }

  // getDevicesById(id: number) {
  //   return this.http.get<Product>(`${this.deviceController}/${id}`);
  // }

  // /**
  //  *  Добавление товара
  //  * @param item - товар
  //  */
  // addProducts(item: ProductCard) {
  //   return this.http.post<ProductCard>(this.controller, item, httpOptions);
  // }

  // addHero(item: ProductCard): Observable<ProductCard> {
  //   return this.http
  //     .post<ProductCard>(this.controller, item, httpOptions)
  //     .pipe(tap(() => this.log(`pudated her id=${item.id}`)));
  // }
  deleteDevice(id: number) {
    const url = this.deviceController;
    return this.http.delete<Response<Product[]>>(`${url}/${id}`);
  }

  addDevice(device: Product) {
    const url = this.deviceController;
    return this.http.post<Response<Product[]>>(url, device, httpOptions);
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
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

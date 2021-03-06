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
  oldprice: number;
  brandId: number;
  typeId: number;
  img?: string;
  // rating?: number;
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

  items: any[] = [];
  filterTypeSubject = new BehaviorSubject(this.items);
  filterBrandSubject = new BehaviorSubject(this.items);

  get refreshNeeds() {
    return this._refreshNeeds$;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getDevices(filter?: any): Observable<ItemsCount<Product>> {
    this.filterTypeSubject.next(this.items);
    this.filterBrandSubject.next(this.items);
    return this.http.get(this.deviceController) as Observable<
      ItemsCount<Product>
    >;
  }

  getFilterDevices(filter?: any): Observable<ItemsCount<Product>> {
    this.filterBrandSubject.next(filter);
    return this.http.get(this.deviceController) as Observable<
      ItemsCount<Product>
    >;
  }

  filterTypeSub(item: any) {
    this.items.push(item);
    return this.filterTypeSubject.next(item);
  }

  filterBrandSub(item: any) {
    this.items.push(item);
    return this.filterBrandSubject.next(item);
  }

  getDevicesById(id: number) {
    return this.http.get<ItemsCount<Product[]>>(
      `${this.deviceController}/${id}`
    );
  }

  items$ = new BehaviorSubject([]);

  updateDeviceItem(id: number, item: any) {
    const url = this.deviceController;
    // this.items$.next(item);
    return this.http.put<any>(`${url}/${id}`, item);
  }

  getAvailableDevice(id: any): Observable<any> {
    return this.http.get<any>(`${this.deviceController}/${id}`);
    // return this.http
    //   .get<ItemsCount<Product>>(this.deviceController, id)
    //   .pipe(catchError((resp) => this.logErrors(resp)));
  }

  /**
   * ???????????????? ?? ???????????????????? ???????????? ?? api
   * @param resp - ?????????? ??????????????
   */
  protected logErrors(resp: HttpErrorResponse): Observable<never> {
    console.error(resp.message);
    return throwError(resp);
  }

  deleteDevice(id: number): Observable<number> {
    const url = this.deviceController;
    return this.http.delete<number>(`${url}/${id}`);
  }

  addDevice(device: any) {
    const url = this.deviceController;
    return this.http.post(url, device);
  }

  createDevice(device: Product): Observable<ItemsCount<Product>> {
    const url = this.deviceController;
    return this.http.post<ItemsCount<Product>>(url, device, httpOptions).pipe(
      tap(() => {
        this._refreshNeeds$.next();
      })
    );
  }

  // updateDevice(item: number) {
  //   const url = this.deviceController;
  //   return this.http.put(url, item);
  // }

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

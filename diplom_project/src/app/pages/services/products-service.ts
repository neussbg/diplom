import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { Product } from 'src/assets/interfaces/products/product-item';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private controller = 'http://localhost:3000/conditioners';

  // private $destroy = new Subject<void>();

  states$: Observable<Product[]>;
  item: Product[] = [];

  log: any;

  constructor(private http: HttpClient) {
    this.states$ = http.get<Product[]>(this.controller);
  }

  getProducts() {
    return this.http.get<Product[]>(this.controller);
  }

  addProducts(item: Product) {
    return this.http.post<Product>(this.controller, item, httpOptions);
  }

  addHero(item: Product): Observable<Product> {
    return this.http
      .post<Product>(this.controller, item, httpOptions)
      .pipe(tap(() => this.log(`pudated her id=${item.id}`)));
  }

  deleteProducts(id?: number): Observable<unknown> {
    const url = `${this.controller}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  updateProduct(item: Product): Observable<Product> {
    return this.http.put<Product>(this.controller, item, httpOptions);
  }

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

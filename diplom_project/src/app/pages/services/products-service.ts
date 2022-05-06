import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { environment } from 'src/environments/environment.production';

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
  /** Мок данных товара */
  private controller = 'http://localhost:3000/conditioners';

  /** Контроллер для подключения бека */
  private backController = 'http://localhost:7000';

  states$: Observable<ProductCard[]>;
  item: ProductCard[] = [];

  log: any;

  constructor(private http: HttpClient) {
    this.states$ = this.getProducts();
    this.http.get(this.backController);
  }

  /** Видимость товаров */
  getProducts() {
    return this.http.get<ProductCard[]>(this.controller);
  }

  /**
   *  Добавление товара
   * @param item - товар
   */
  addProducts(item: ProductCard) {
    return this.http.post<ProductCard>(this.controller, item, httpOptions);
  }

  addHero(item: ProductCard): Observable<ProductCard> {
    return this.http
      .post<ProductCard>(this.controller, item, httpOptions)
      .pipe(tap(() => this.log(`pudated her id=${item.id}`)));
  }

  deleteProducts(id?: number): Observable<unknown> {
    const url = `${this.controller}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  updateProduct(item: ProductCard): Observable<ProductCard> {
    return this.http.put<ProductCard>(this.controller, item, httpOptions);
  }

  addToCart(product: ProductCard) {
    this.item.push(product);
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
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

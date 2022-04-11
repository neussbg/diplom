import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Product } from 'src/assets/interfaces/products/product-item';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private controller = 'http://localhost:3000/conditioners';

  // private $destroy = new Subject<void>();


  item:Product[] = [];

  constructor(private http: HttpClient) { }


  getProducts(){
     return this.http.get<Product[]>(this.controller);
  }

  addProducts(item: Product){
    return this.http.post<Product>(this.controller, item , httpOptions)
  }

  deleteProducts(id:number): Observable<unknown>{
    const url = `${this.controller}/${id}`;
    return this.http.delete(url, httpOptions)
  }

  updateProduct(item:Product): Observable<Product>{
    return this.http.put<Product>(this.controller, item, httpOptions);
  }



  

}



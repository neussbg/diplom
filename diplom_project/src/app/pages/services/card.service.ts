import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cartItemsList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemsList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemsList.push(product);
    this.productList.next(product);
    localStorage.setItem('items', JSON.stringify(this.cartItemsList));
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    let localItems = JSON.parse(localStorage.getItem('items') as string);
    localItems.map((el: Product) => {
      grandTotal += el.price;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemsList.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemsList.splice(index, 1);
      }
    });
    console.log(this.cartItemsList);

    this.productList.next(this.cartItemsList);
  }

  removeAllCartItems() {
    this.cartItemsList = [];
    this.productList.next(this.cartItemsList);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cartItemsList: any[] = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() {}

  private storageSub = new Subject();

  getProducts() {
    return this.productList.asObservable();
  }

  itemInCart(item: any): boolean {
    return this.cartItemsList.findIndex((o) => o.id === item.id) > -1;
  }


  getItems() {
    return this.cartItemsList;
  }

  setProduct(product: any) {
    this.cartItemsList.push(...product);
    this.productList.next(product);
  }

  add(addItem: any) {
    this.cartItemsList.push(addItem);

    let existingItems = [];
    if (localStorage.getItem('items')) {
      existingItems = JSON.parse(localStorage.getItem('items') as string);
      existingItems = [addItem, ...existingItems];
    } else {
      console.log('no items');
      existingItems = [addItem];
    }
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

  saveCart(): void {
    localStorage.setItem('items', JSON.stringify(this.cartItemsList));
  }

  removeItem(item: any) {
    const index = this.cartItemsList.findIndex((i) => i.id === item.id);

    if (index > -1) {
      this.cartItemsList.splice(index, 1);
      this.saveCart();
    }
  }
}

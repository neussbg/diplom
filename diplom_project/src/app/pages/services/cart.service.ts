import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  items: any[] = [];

  itemsList$ = new BehaviorSubject(this.items);

  public productList = new BehaviorSubject<any>([]);

  item$ = new BehaviorSubject([]);

  addToCart(addedItem: any) {
    this.items.push(addedItem);
    this.productList.next(addedItem);
    this.itemsList$.next(this.items);

    //-----check if there are items already added in cart
    let existingItems = [];
    if (localStorage.getItem('cart_items')) {
      //----- update by adding new items
      existingItems = JSON.parse(localStorage.getItem('cart_items') as string);
      existingItems = [addedItem, ...existingItems];
      console.log('Items exists');

      this.item$.subscribe((data) => {});
    }
    //-----if no items, add new items
    else {
      console.log('NO items exists');
      existingItems = [addedItem];
    }
    this.saveCart();
  }

  getTotalItemsLenght() {}

  getItems() {
    this.itemsList$.next(this.items);
    return this.items;
  }

  getProducts() {
    return this.productList.asObservable();
  }

  loadCart(): void {
    this.items = JSON.parse(localStorage.getItem('cart_items') as string) ?? [];
  }

  saveCart(): void {
    this.productList.next(this.items);
    localStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  clearCart(items: any) {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    let localItems = JSON.parse(localStorage.getItem('cart_items') as string);
    localItems.map((el: Product) => {
      grandTotal += el.price;
    });
    return grandTotal;
  }

  removeItem(item: any) {
    debugger;
    const index = this.items.findIndex((i) => i.id === item.id);

    if (index > -1) {
      this.items.splice(index, 1);
      // this.productList.next(this.items.splice(index, 1));
      this.itemsList$.next(this.items.splice(index, 1));
      this.saveCart();
    }
  }

  itemInCart(item: any): boolean {
    return this.items.findIndex((o) => o.id === item.id) > -1;
  }
}

import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { RouterEnum } from 'src/assets/enums/router.enum';
import { CardService } from '../services/card.service';
import { CartService } from '../services/cart.service';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../services/products.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketPageComponent implements OnInit {
  constructor(
    private cartApi: CardService,
    private navApi: NavigationService,
    private cartService: CartService
  ) {}
  @ViewChildren('totalElementCount') totalElementCount!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing?: QueryList<ElementRef>;

  items: any[] = [];

  totalCount: number = 0;

  isActive: boolean = false;

  itemsArray: Product[] = [];
  public products: any = [];
  public grandTotal!: number;

  Object = Object;

  ngOnInit(): void {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    console.log(this.items.length);

    this.cartService.itemsList$.subscribe((data) => {
      this.totalCount = data.length;
    });
  }

  get total() {
    return this.items.reduce(
      (totalCount, element) => ({
        rating: 1,
        price: totalCount.price + element.rating * element.price,
      }),
      { rating: 1, price: 0 }
    ).price;
  }

  totalPriceElement(item: any, index: number) {
    const qty = item.rating;
    const amt = item.price;
    const subTotal = amt * qty;
    this.totalElementCount.toArray()[index].nativeElement.innerHTML = subTotal;
    this.cartService.saveCart();
  }

  //----- remove specific item
  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  //----- clear cart item
  clearCart(items: any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }

  removeItem(index: number) {
    this.itemsArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
  }

  // emptyCart() {
  //   this.cartApi.removeAllCartItems();
  // }
}

// goToProductList(route: string) {
//   this.navApi.navigateTo(route);
// }

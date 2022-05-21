import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterEnum } from 'src/assets/enums/router.enum';
import { CardService } from '../services/card.service';
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
    private navApi: NavigationService
  ) {}
  items: any = [];

  totalCount: number = 0;

  itemsArray: Product[] = [];
  public products: any = [];
  public grandTotal!: number;

  Object = Object;

  ngOnInit(): void {
    this.cartApi.getProducts().subscribe((res) => {
      this.products = res;
      // Object.keys(this.products).map((k) => {
      //   console.log(k);
      // });
      this.itemsArray = JSON.parse(localStorage.getItem('items') as string);
      this.totalCount = this.cartApi.cartItemsList.length;
      this.grandTotal = this.cartApi.getTotalPrice();

      // console.log(this.itemsArray, 'itemsss');
    });
  }

  removeItem(index: number) {
    // this.cartApi.removeCartItem(item);
    this.itemsArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
    this.totalCount--;
    console.log(this.itemsArray);
  }

  emptyCart() {
    this.cartApi.removeAllCartItems();
  }
}

// goToProductList(route: string) {
//   this.navApi.navigateTo(route);
// }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardService } from 'src/app/pages/services/card.service';
import { CartService } from 'src/app/pages/services/cart.service';
import {
  Product,
  ProductsService,
} from 'src/app/pages/services/products.service';
import { Routes } from 'src/assets/const/route.data';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  constructor(
    private navigate: NavigationService,
    private cardApi: CardService,
    private cartService: CartService
  ) {}

  /** Маршруты */
  routes? = Routes;

  totalItems: number = 0;

  items: any[] = [];

  test: any[] = [];

  totalItems$ = new BehaviorSubject<number>(this.totalItems);

  totalCount!: number;

  /** Флаг переключения темы */
  @Input() changerTheme: boolean = false;

  /** Флаг изменения события переключения темы   */
  @Output() eventChangeThemeToggle = new EventEmitter<boolean>();

  item: any;
  ngOnInit(): void {
    // this.totalCont = JSON.parse(
    //   localStorage.getItem('cart_items') as string
    // ).length;
    this.cartService.itemsList$.subscribe((data) => {
      this.totalCount = data.length;
    });

    // this.getProductList();
    const ss = this.cartService.loadCart();
    this.items = this.cartService.getItems();
    // this.cartService.getProducts().subscribe((s) => {
    //   this.test.push(s);
    //   console.log(this.test);
    // });
    // this.cartService.item$.subscribe((s) => {
    //   console.log(s);
    // });
  }

  getProductList() {
    this.cardApi.getProducts().subscribe(() => {
      this.item = JSON.parse(localStorage.getItem('items') as string) || null;
      this.totalItems = this.item.length;
      this.totalItems = this.cardApi.cartItemsList.length;
      // console.log(this.totalItems, 'items');
    });
  }

  /** Перенаправляет на страницу */
  redirectTo(route?: string): void {
    this.navigate.navigateTo(route as string);
  }

  /** Пеерключает тему приложения */
  onChangeTheme() {
    console.log(this.changerTheme);

    this.changerTheme = !this.changerTheme;
    this.eventChangeThemeToggle.emit(this.changerTheme);
  }
}

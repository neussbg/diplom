import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardService } from 'src/app/pages/services/card.service';
import {
  Product,
  ProductsService,
} from 'src/app/pages/services/products.service';
import { Routes } from 'src/assets/const/route.data';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  constructor(
    private navigate: NavigationService,
    private cardApi: CardService
  ) {}

  /** Маршруты */
  routes? = Routes;

  totalItems: number = 0;

  /** Флаг переключения темы */
  @Input() changerTheme: boolean = false;

  /** Флаг изменения события переключения темы   */
  @Output() eventChangeThemeToggle = new EventEmitter<boolean>();

  item: any;
  ngOnInit(): void {
    this.cardApi.getProducts().subscribe(() => {
      this.item = JSON.parse(localStorage.getItem('items') as string) || null;
      this.totalItems = this.item.length;
      // this.totalItems = this.cardApi.cartItemsList.length;
    });
  }

  /** Перенаправляет на страницу */
  redirectTo(route?: string): void {
    this.navigate.navigateTo(route as string);
  }

  /** Пеерключает тему приложения */
  onChangeTheme() {
    this.changerTheme = !this.changerTheme;
    this.eventChangeThemeToggle.emit(this.changerTheme);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/pages/services/products-service';
import { Routes } from 'src/assets/const/route.data';
import { Product } from 'src/assets/interfaces/products/product-item';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  // isSearchingInfo: boolean = false;

  constructor(
    private navigate: NavigationService,
    private productService: ProductsService
  ) {}

  /** Маршруты */
  routes? = Routes;

  test!: Product;

  ds?: boolean;

  @Input() changerTheme: boolean = false;

  @Output() toggle = new EventEmitter();

  ngOnInit(): void {}

  /** Перенаправляет на страницу */
  redirectTo(route?: string): void {
    this.navigate.navigateTo(route as string);
  }

  testMethod() {
    this.productService.addToCart(this.test);
  }

  onChangeTheme() {
    this.changerTheme = !this.changerTheme;
    this.toggle.emit(this.changerTheme);
  }

  // /** Показывает поисковую строчку */
  // searchInfo(event: any): void {
  //   this.isSearchingInfo = !this.isSearchingInfo;
  // }
}

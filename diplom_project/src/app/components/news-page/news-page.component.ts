import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from 'src/app/pages/services/products-service';
import { Routes } from 'src/assets/const/route.data';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  constructor(private navigate: NavigationService) {}

  /** Маршруты */
  routes? = Routes;

  /** Флаг переключения темы */
  @Input() changerTheme: boolean = false;

  /** Флаг изменения события переключения темы   */
  @Output() eventChangeThemeToggle = new EventEmitter<boolean>();

  ngOnInit(): void {}

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

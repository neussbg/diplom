import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingPath } from 'src/assets/enums/router.enum';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {

    /** Флаг аунтификации акаунта */
  isLogined: boolean = false;

    /** Флаг поисковой строки */
  isSearchingInfo: boolean = false;

  constructor(private route: Router) {}

  ngOnInit(): void {}

  /** Переходит на страницу корзины товаров */
  openBasket() : void {
    this.route.navigateByUrl(RoutingPath.basketPage);
  }
  /** Переходит на  страницу продуктов */
  openProducts(): void {
    this.route.navigateByUrl(RoutingPath.productsPage);
  }

  /** Переходит на главную страницу */
  openMain(): void{
    this.route.navigateByUrl(RoutingPath.mainPage);
  }

  /** Переходит на страницу о компании */
  openCompany(): void {
    this.route.navigateByUrl(RoutingPath.companyPage);
  }


  /** Переходит на страницу профиля */
    openProfile(): void {
      this.route.navigateByUrl(RoutingPath.accoutPage);
    }

  /** Меняет флаг регистрации профиля */
  loginUser(): void{
    this.isLogined = !this.isLogined;
    this.openProfile();
  }

  /** Показывает поисковую строчку */
  searchInfo(event: any): void {
    this.isSearchingInfo = !this.isSearchingInfo;
  }

}

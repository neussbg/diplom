import { Component, OnInit } from '@angular/core';
import { Routes } from 'src/assets/const/route.data';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  // isSearchingInfo: boolean = false;

  constructor(private navigate: NavigationService) {}

  /** Маршруты */
  routes? = Routes;

  ngOnInit(): void {}

  /** Перенаправляет на страницу */
  redirectTo(route?: string): void {
    this.navigate.navigateTo(route as string);
  }

  // /** Показывает поисковую строчку */
  // searchInfo(event: any): void {
  //   this.isSearchingInfo = !this.isSearchingInfo;
  // }
}

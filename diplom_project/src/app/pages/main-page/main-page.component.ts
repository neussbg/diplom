import { Component, OnInit } from '@angular/core';
import { CATEGORIES_ITEMS } from 'src/assets/const/categories-items';
import { MAIN_ITEMS } from 'src/assets/const/main-items';
import * as AOS from 'aos';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isHovered: boolean = false;

  items = MAIN_ITEMS;

  // categoriesItems = CATEGORIES_ITEMS;

  tesst: any;

  constructor() {
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    });
  }

  ngOnInit(): void {}
  test(): void {
    this.isHovered = !this.isHovered;
  }

  onClickStocks(elem: any): void {}
}

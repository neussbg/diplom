import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/pages/services/navigation.service';
import { CATEGORIES_ITEMS } from 'src/assets/const/categories-items';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private nav: NavigationService) {}

  isNightTheme: boolean = false;
  /** Мок для категорий кондиционеров */
  categoriesItems = CATEGORIES_ITEMS;

  ngOnInit(): void {
    this.nav.themeSubject.subscribe((data) => {
      this.isNightTheme = data;
    });
  }
}

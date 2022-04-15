import { Component, OnInit } from '@angular/core';
import { CATEGORIES_ITEMS } from 'src/assets/const/categories-items';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  categoriesItems = CATEGORIES_ITEMS;

  ngOnInit(): void {
  }

}

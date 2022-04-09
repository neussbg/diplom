import { Component, OnInit } from '@angular/core';
import { PRODUCT_ITEMS } from 'src/assets/const/product-items';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  productItems = PRODUCT_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}

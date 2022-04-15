import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PRODUCT_ITEMS } from 'src/assets/const/product-items';
import { Product } from 'src/assets/interfaces/products/product-item';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  productItems = PRODUCT_ITEMS;

  destroy$ = new Subject<void>();

  itemsArray: Product[] = [];

  constructor(private productsApi: ProductsService) {}

  ngOnInit(): void {
    this.viewProducts();
  }

  ngOnDestroy(): any {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private viewProducts(): void {
    this.productsApi
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.itemsArray = data;
      });
  }
}

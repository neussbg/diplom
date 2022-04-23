import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  ss: any;

  id?: number;
  constructor(private productsApi: ProductsService) {}

  ngOnInit(): void {
    this.viewProducts();
  }

  itemDescription: string = '';

  // productForm = new FormGroup({
  //   name: new FormControl(),
  //   newPrice: new FormControl(),
  //   description: this.test,
  // });

  ngOnDestroy(): any {
    this.destroy$.next();
    this.destroy$.complete();
  }

  tests() {
    // this.itemsArray = this.productsApi.getProducts()
    this.itemsArray = this.itemsArray.filter((s) => {
      s.description.toLowerCase().startsWith(this.test.value);
    });
  }

  test = new FormControl();

  search() {
    this.itemDescription != ''
      ? (this.itemsArray = this.itemsArray.filter((filter) => {
          console.log('test');
          return filter.description
            .toLocaleLowerCase()
            .match(this.itemDescription.toLocaleLowerCase() as string);
        }))
      : this.ngOnInit();
  }

  // test(data: any) {
  //   this.productsApi.addHero(data).subscribe((s) => s);
  // }

  private viewProducts(): void {
    this.productsApi
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.itemsArray = data;
      });
  }

  addForm(name: Product): void {
    this.productsApi.addHero(name).subscribe((hero) => {
      this.itemsArray.push(hero);
    });
  }

  deleteItem(id?: number): void {
    this.productsApi.deleteProducts(id);
  }
}

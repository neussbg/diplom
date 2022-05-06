import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_NUMBER_FORMAT, NumberFormatSettings } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { PRODUCT_ITEMS } from 'src/assets/const/product-items';
import { Product } from 'src/assets/interfaces/products/product-item';
import { ProductsService } from '../services/products-service';
import { environment } from 'src/environments/environment.production';

export const typeConditioners = [
  'Кассетные сплит-системы',
  'Канальные сплит-системы',
  'Колонные сплит-системы',
  'Напольно-потолочные сплит-системы',
  'Настенные сплит-системы',
];

export enum dsds {}

export const brands = [
  {
    brand: 'Bosch',
    isChecked: false,
  },
  {
    brand: 'Haier',
    isChecked: false,
  },
  {
    brand: 'Jax',
    isChecked: true,
  },
  {
    brand: 'Rovex',
    isChecked: false,
  },
  {
    brand: 'Tosot',
    isChecked: false,
  },
  {
    brand: 'Centek',
    isChecked: false,
  },
  {
    brand: 'Kentatsu',
    isChecked: true,
  },
  {
    brand: 'Samsung',
    isChecked: false,
  },
];
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  type = typeConditioners;

  brands = brands;

  series = [7, 9, 12, 18, 24, 30, 36];

  readonly min = 5;
  readonly max = 150;
  readonly sliderStep = 1;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  productItems = PRODUCT_ITEMS;
  readonly control = new FormControl([this.min, this.max / 2]);

  destroy$ = new Subject<void>();

  itemsArray: Product[] = [];

  ss: any;

  flag?: boolean;

  id?: number;

  selectConditoners: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    brand: new FormControl(this.flag, Validators.required),
    inventor: new FormControl(null, Validators.required),
    series: new FormControl(null, Validators.required),
  });

  constructor(
    private productsApi: ProductsService,
    @Inject(TUI_NUMBER_FORMAT)
    readonly numberFormatSettings: NumberFormatSettings
  ) {
    console.log(environment.apiUrl);
  }

  ngOnInit(): void {
    this.brands.forEach((s) => (this.flag = s.isChecked));
    this.viewProducts();
  }

  productId: number = 0;
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

  test123() {
    localStorage.setItem(this.productId.toString(), 'value');
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
        data.forEach((s) => {
          this.productId = s.id;
        });
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

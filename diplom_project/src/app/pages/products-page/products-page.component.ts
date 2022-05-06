import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_NUMBER_FORMAT, NumberFormatSettings } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { ProductsService } from '../services/products-service';
import { environment } from 'src/environments/environment.production';
import { brandsConditioners as brandsConditioners } from 'src/assets/const/products/brands';
import { typeConditioners } from 'src/assets/const/products/types-conditioners';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  /** Мок для типа кондиционеров */
  type = typeConditioners;

  /** Мок для бренда кондиционеров */
  brands = brandsConditioners;

  /** Мок серии */
  series = [7, 9, 12, 18, 24, 30, 36];

  readonly min = 5;
  readonly max = 150;
  readonly sliderStep = 1;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  readonly control = new FormControl([this.min, this.max / 2]);

  /** Subject для отслеживания уничтожения компоненты */
  destroy$ = new Subject<void>();

  /** Список карточек товара */
  ProductsCardArray: ProductCard[] = [];

  /**
   * @todo - допилить crud запросы с флагами
   */
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
    this.ProductsCardArray = this.ProductsCardArray.filter((s) => {
      s.description.toLowerCase().startsWith(this.test.value);
    });
  }

  test = new FormControl();

  search() {
    this.itemDescription != ''
      ? (this.ProductsCardArray = this.ProductsCardArray.filter((filter) => {
          console.log('test');
          return filter.description
            .toLocaleLowerCase()
            .match(this.itemDescription.toLocaleLowerCase() as string);
        }))
      : this.ngOnInit();
  }

  private viewProducts(): void {
    this.productsApi
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.ProductsCardArray = data;
        data.forEach((s) => {
          this.productId = s.id;
        });
      });
  }

  // addForm(name: ProductCard): void {
  //   this.productsApi.addHero(name).subscribe((hero) => {
  //     this.itemsArray.push(hero);
  //   });
  // }

  deleteItem(id?: number): void {
    this.productsApi.deleteProducts(id);
  }
}

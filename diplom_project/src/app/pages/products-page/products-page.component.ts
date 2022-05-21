import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_NUMBER_FORMAT, NumberFormatSettings } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductCard } from 'src/assets/interfaces/products/product-card';
import { ProductsService } from '../services/products.service';
import { environment } from 'src/environments/environment.prod';
import { brandsConditioners as brandsConditioners } from 'src/assets/const/products/brands';
import { typeConditioners } from 'src/assets/const/products/types-conditioners';
import { TaskService } from '../services/task.service';
import { Product } from '../services/products.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { NavigationService } from '../services/navigation.service';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/assets/enums/router.enum';
import { CardService } from '../services/card.service';

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

  length = 10;

  index = 0;

  goToPage(index: number): void {
    this.index = index;

    console.info('New page:', index);
  }

  readonly min = 5;
  readonly max = 150;
  readonly sliderStep = 1;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  readonly control = new FormControl([this.min, this.max / 2]);

  /** Subject для отслеживания уничтожения компоненты */
  destroy$ = new Subject<void>();

  /** Список карточек товара */
  ProductsCardArray: any[] = [];

  devicesArray: Product[] = [];

  addDeviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    brandId: new FormControl(null, Validators.required),
    typeId: new FormControl(null, Validators.required),
    info: new FormControl(null, Validators.required),
  });

  /**
   * @todo - допилить crud запросы с флагами
   */
  flag?: boolean;

  id!: number;

  selectConditoners: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    brand: new FormControl(this.flag, Validators.required),
    inventor: new FormControl(null, Validators.required),
    series: new FormControl(null, Validators.required),
  });

  constructor(
    private productsApi: ProductsService,
    private navagationApi: NavigationService,
    private cardService: CardService,
    private router: Router,
    @Inject(TUI_NUMBER_FORMAT)
    readonly numberFormatSettings: NumberFormatSettings
  ) {}
  productId!: number;

  ngOnInit(): void {
    this.productsApi.getDevices().subscribe((data) => {
      this.devicesArray = data.rows;
      this.devicesArray.forEach((element) => {
        Object.assign(element, { quantity: 1, total: element.price });
      });
    });
  }

  addToCard(item: any) {
    this.cardService.addToCart(item);
    // localStorage.setItem('items', item)
  }

  ngOnDestroy(): any {
    this.destroy$.next();
    this.destroy$.complete();
  }

  test!: Product;

  addDevice(device: Product) {
    this.productsApi.addDevice(device as Product).subscribe((item) => {
      item.rows.map((item) => {
        this.devicesArray.push(item);
      });
    });
    console.log('click');
  }

  deleteDevice(id: number) {
    this.productsApi.deleteDevice(id).subscribe((data) => {
      return data.rows.map((s) => {
        id = s.id;
      });
    });
  }

  data!: Product;
  test1(id: number) {
    // if (id) {
    //   this.devicesArray.map((s) => {
    //     this.data = s;
    //     this.getDevicesById(id);
    //     this.navagationApi.navigate('products/', this.data);
    //   });
    //   console.log(this.data);
    // }
  }

  openProductCard(id: any): void {
    this.getDevicesById(id);
    this.router.navigate([
      `${RouterEnum.productsPage}/
      ${id}`,
    ]);
    console.log(event);
  }

  getDevicesById(id: number) {
    setTimeout(() => {
      this.devicesArray.forEach((s) => {
        console.log(s.id);
      });

      this.productsApi
        .getDevicesById(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          data.rows.map((item) => {
            id == item.id;
          });
        });
    }, 0);
  }

  deleteItem(id?: number): void {}
}

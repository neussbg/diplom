import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TUI_NUMBER_FORMAT, NumberFormatSettings } from '@taiga-ui/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import {ProductsService } from '../services/products.service';
import { brandsConditioners as brandsConditioners } from 'src/assets/const/products/brands';
import { typeConditioners } from 'src/assets/const/products/types-conditioners';
import { Product } from '../services/products.service';
import { NavigationService } from '../services/navigation.service';
import { Router } from '@angular/router';
import { CardService } from '../services/card.service';
import { CartService } from '../services/cart.service';
import { BrandsService } from '../services/brands.service';

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
    img: new FormControl(null, Validators.required),
  });

  /**
   * @todo - допилить crud запросы с флагами
   */
  flag?: boolean;

  deviceId!: number;

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
    private brandApi: BrandsService,
    private cartServer: CartService,
    @Inject(TUI_NUMBER_FORMAT)
    readonly numberFormatSettings: NumberFormatSettings
  ) {}
  productId!: number;

  items: any[] = [];

  brandIdToProducts!: number;
  ngOnInit(): void {
    console.log(this.brandIdToProducts, 'brandToProducts');
    this.brandApi.brandId.subscribe((s) => {
      console.log(s, 'dsds');
    });

    // this.getAllDevices();
    // this.getAll();
    this.cartServer.loadCart();
    this.items = this.cartServer.getItems();
    // this.devicesArray = this.cardService.getItems();

    // this.productsApi.getDevices().subscribe((data) => {
    //   // this.devicesArray = data.rows;
    //   this.devicesArray.forEach((element) => {
    //     Object.assign(element, { quantity: 1, total: element.price });
    //   });
    // });
  }

  addToCart(item: Product) {
    if (!this.cartServer.itemInCart(item)) {
      // item.rating = 1;
      this.cartServer.addToCart(item); //add items in cart
      this.items = [...this.cartServer.getItems()];
    }
  }

  private getAll() {
    this.productsApi.getDevices().subscribe((items) => {
      this.devicesArray = items.rows;
      // this.devicesArray.forEach((s) => {
      //   this.deviceId = s.id;
      // });
    });
  }

  // getAllDevices() {
  //   this.productsApi.getDevices().subscribe((s) => {
  //     this.devicesArray = s.rows;
  //   });
  // }

  // addToCard(item: any) {
  //   this.cardService.addToCart(item);
  //   // localStorage.setItem('items', item)
  // }

  ngOnDestroy(): any {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // addToCart(item: any) {
  //   this.cardService.addToCart(item);
  //   // if (!this.cardService.itemInCart(item)) {
  //   //   item.rating = 1;
  //   //   this.cardService.add(item); //add items in cart
  //   //   this.ProductsCardArray = [...this.cardService.getItems()];
  //   // }
  // }

  testAdmin(): boolean {
    console.log(this.brandIdToProducts);

    return (this.isAdminUser = !this.isAdminUser);
  }

  isAdminUser: boolean = false;

  test!: Product;

  // addDevice(device: Product) {
  //   this.productsApi.addDevice(this.addDeviceForm.value).subscribe((item) => {
  //     item.rows.map((item: any) => {
  //       this.devicesArray.push(item);
  //     });
  //   });
  //   console.log('click');
  // }

  create(device: Product) {
    // this.productsApi
    //   .createDevice(this.addDeviceForm.value)
    //   .subscribe((item) => {
    //     return item.rows.map((item) => {
    //       this.devicesArray.push(item);
    //     });
    //   });
  }

  deleteDevice(id: number) {
    this.productsApi.deleteDevice(id).subscribe();
  }

  data!: Product;

  openProductCard(id: any): void {
    // this.getDevicesById(id);
    // this.router.navigate([
    //   `${RouterEnum.productsPage}/
    //   ${id}`,
    // ]);
    // console.log(event);
  }

  // getDevicesById(id: number) {
  //   setTimeout(() => {
  //     this.devicesArray.forEach((s) => {
  //       console.log(s.id);
  //     });

  //     this.productsApi
  //       .getDevicesById(id)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((data) => {
  //         data.rows.map((item) => {
  //           id == item.id;
  //         });
  //       });
  //   }, 0);
  // }

  deleteItem(id?: number): void {}
}

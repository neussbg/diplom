import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TuiContextWithImplicit,
  TuiPortalService,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { CartService } from 'src/app/pages/services/cart.service';
import {
  Product,
  ProductsService,
} from 'src/app/pages/services/products.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { logginLabels } from 'src/assets/enums/logginLabels.enum';
import { Dictionary } from 'src/app/pages/attendance-page/attendance-page.component';
import { NavigationService } from 'src/app/pages/services/navigation.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(
    private productsApi: ProductsService,
    private cartServer: CartService,
    private navigationService: NavigationService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  allItemsValue: any[] = [];

  devicesArray: any[] = [];

  deviceId!: number;

  brandsNameDictionary: Dictionary<string> = BrandsDictionary;

  @Input() isAdmin: boolean = false;

  isHeartActive: Array<boolean> = [];

  length = 10;

  star?: number;
  index = 0;
  ss: any;

  rateControl = new FormControl(this.star as number);
  ngOnInit(): void {
    this.getAllProducts();

    this.cartServer.loadCart();
    this.allItemsValue = this.cartServer.getItems();
  }

  testValue = new FormControl();

  items = ['В наличии', 'Нет в наличии'];

  goToPage(index: number): void {
    this.index = index;

    console.info('New page:', index);
  }

  data: any;
  openProductCard(data: any): void {
    this.productsApi.getAvailableDevice(data).subscribe((item: Product[]) => {
      this.data = item;
      item.map((s) => {
        this.data = s;
      });
    });
    this.navigationService.navigate('products/card', this.data);
  }

  getAllProducts() {
    this.productsApi.getDevices().subscribe((items) => {
      this.devicesArray = items.rows;
      this.devicesArray.forEach((s: Product) => {
        this.deviceId = s.id;
        this.star = s.rating;
      });
    });
  }

  deviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    brandId: new FormControl(null, Validators.required),
    typeId: new FormControl(null, Validators.required),
    img: new FormControl(null, Validators.required),
    rating: new FormControl(null, Validators.required),
  });

  itemExist: Array<boolean> = [];
  /** Добавляет эллемент в корзину
   * @param item - товар
   */
  addToCart(item: Product) {
    if (!this.cartServer.itemInCart(item)) {
      item.rating = 1;
      this.cartServer.addToCart(item); //add items in cart
      this.allItemsValue = [...this.cartServer.getItems()];
    }
  }

  itemValue: any;

  isCreateActive: boolean = false;

  /** Создает новый девайс
   * @param device - товар
   */
  createNewDevice(device: Product, result?: string) {
    this.productsApi.addDevice(this.deviceForm.value).subscribe((data) => {
      this.itemValue = data;
      this.devicesArray.push(this.itemValue);
      this.alertService.open(result as string).subscribe();
    });
  }

  /** Удаляет девайс по ИД
   * @param id - ИД товара
   */
  deleteDevice(id: number) {
    this.productsApi.deleteDevice(id).subscribe((idItem: any) => {
      this.devicesArray.splice(idItem, 1);
      this.getAllProducts();
    });
  }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: 'Добавление нового товара',
        size,
      })
      .subscribe();
  }

  editMode: boolean = false;
  updateDevice(id: number) {
    let currentDevice = this.devicesArray.find((p) => {
      return p.id === id;
    });
    this.productsApi.updateDevice(id);

    this.deviceForm.setValue({
      brandId: currentDevice.brandId,
      typeId: currentDevice.typeId,
      name: currentDevice.name,
      price: currentDevice.price,
      img: currentDevice.img,
      rating: currentDevice.rating,
    });

    console.log(currentDevice);

    // this.productsApi.updateDevice(id).subscribe((idItem:any)=>{
    //   this.devicesArray
    // })
    this.editMode = true;
  }

  id!: number;

  typesNames: Dictionary<string> = TypeDictionary;

  ratingStars(item: any) {
    this.devicesArray.find((p) => {
      this.id = p.id;
      this.isHeartActive[item] = true;
    });

    // this.isHeartActive = !this.isHeartActive;
  }

  /** Преобразование коллекции для списка тайги */
  @tuiPure
  stringify(
    dictionary: Dictionary<string>
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    return ({ $implicit }: TuiContextWithImplicit<string>): string => {
      return dictionary[$implicit] || '';
    };
  }
}

export enum TypesSplit {
  ChannelSplit = 9,
  columnedSplit = 10,
  FloorCeiling = 11,
  cassette = 12,
}

export const TypeDictionary: Dictionary<string> = {
  [TypesSplit.ChannelSplit]: 'Канальные сплит-системы',
  [TypesSplit.columnedSplit]: 'Колонные сплит-системы',
  [TypesSplit.FloorCeiling]: 'Напольно-потолочные сплит-системы',
  [TypesSplit.cassette]: 'Кассетные сплит-системы',
};

export enum BrandsSplit {
  Bosch,
  Haier,
  Jax,
  Rovex,
  Tosot,
  Centek,
  Kentatsu,
  Samsung,
}
export const BrandsDictionary: Dictionary<string> = {
  [BrandsSplit.Bosch]: 'Bosch',
  [BrandsSplit.Haier]: 'Haier',
  [BrandsSplit.Jax]: 'Jax',
  [BrandsSplit.Tosot]: 'Tosot',
  [BrandsSplit.Centek]: 'Centek',
  [BrandsSplit.Kentatsu]: 'Kentatsu',
  [BrandsSplit.Samsung]: 'Samsung',
};

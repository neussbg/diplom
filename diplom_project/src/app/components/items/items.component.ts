import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
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
import { Dictionary } from 'src/app/pages/attendance-page/attendance-page.component';
import { NavigationService } from 'src/app/pages/services/navigation.service';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService,
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  @ViewChild('content', { static: true }) content?: any;

  @ViewChild('contentDelete', { static: true }) contentDelete?: any;

  allItemsValue: any[] = [];

  devicesArray: any[] = [];

  deviceId!: number;

  brandsNameDictionary: Dictionary<string> = BrandsDictionary;

  @Input() isAdmin: boolean = false;

  isHeartActive: Array<boolean> = [];

  star?: number;

  /** Кол-во элементов на странице */
  pageCount: number = 9;

  /** Кол-во всех девайсов */
  deviceCount!: number;

  /** Текущая страница */
  currentPage!: number;

  itemExist: Array<boolean> = [];

  isEdit?: boolean = false;

  isDeleted: boolean = false;

  rateControl = new FormControl(this.star as number);
  ngOnInit(): void {
    this.getAllProducts();
    this.devicesArray.forEach((s) => {});

    this.cartServer.loadCart();
    this.allItemsValue = this.cartServer.getItems();
  }

  file = null;
  teeest: any;
  uploadFile(event: any) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      this.deviceForm.patchValue({
        img: event.target.files[0] || null,
      });
    }
    this.teeest = new FormData();
    this.teeest.append('file', file, file.name);
    // debugger;
    // const reader = new FileReader();

    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.deviceForm.patchValue({
    //       img: reader.result,
    //     });
    //   };

    //   // need to run CD since file load runs outside of zone
    // }

    // this.file = event.target.files[0];
    // this.deviceForm.patchValue({
    //   img: this.file,
    // });
    // this.deviceForm.get('img')?.updateValueAndValidity();
  }

  testValue = new FormControl();

  items = ['В наличии', 'Нет в наличии'];

  showNextPage(page: any): void {
    this.currentPage = page + 1;
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

  itemValueProduct!: Product;
  itemId!: number;
  getOneItem(item: Product, flag?: boolean) {
    console.log(item);
    this.itemValueProduct = item;
    this.isEdit = flag;

    this.itemId = item.id;
    if (item) {
      // this.deviceForm =
      this.deviceForm.setValue({
        brandId: this.itemValueProduct.brandId,
        img: this.itemValueProduct.img,
        name: this.itemValueProduct.name,
        price: this.itemValueProduct.price,
        oldprice: this.itemValueProduct.oldprice,
        typeId: this.itemValueProduct.typeId,
      });
    }

    this.itemValueProduct = item;

    this.onClick(this.content, 'l');
  }

  getOneItemToDelete(itemId: any) {
    this.itemValueProduct = itemId;
    this.isDeleted = true;

    this.onClick(this.contentDelete, 'l');
  }

  onSubmitDelete(itemId: number) {
    if (this.isDeleted) {
      this.productsApi.deleteDevice(itemId).subscribe((dat) => {
        this.devicesArray.splice(itemId, 1);
        this.getAllProducts();
      });
    }
  }

  onSubmit(item?: any, isEditable?: boolean) {
    this.isEdit = isEditable;
    item = this.itemValueProduct;
    console.log(this.itemValueProduct);

    if (this.isEdit == true) {
      this.updateDeviceValue(item.id, item);
    } else {
      this.createNewDevice();
    }
    this.getAllProducts();
  }
  // onSubmitForm() {
  //   if (this.isEdit === true) {
  //     this.updateProduct(this.itemValueProduct.id, this.itemValueProduct);
  //   } else {
  //     this.createNewDevice(this.itemValue, 'Ваш товар был успешно добавлен');
  //   }
  // }

  updateProduct(id: number, item: Product) {
    this.productsApi.updateDeviceItem(id, item).subscribe((data: Product) => {
      console.log(item);
      console.log(data);
    });
  }

  cancel(value: any) {
    console.log(value);
    this.deviceForm.reset()
    // this.addBrandForm.reset(value);
    // if (!this.isAdded || !this.isDeleted) {
    //   this.addBrandForm.reset();
    // }
  }

  ultraTotal!: number;

  deviceImg?: string;

  getAllProducts() {
    this.productsApi.getDevices().subscribe((items) => {
      this.devicesArray = items.rows;
      this.deviceCount = items.rows.length;
      this.ultraTotal = Math.ceil(this.deviceCount / this.pageCount);

      this.devicesArray.forEach((s: Product) => {
        this.deviceId = s.id;

        this.deviceImg = s.img;
        console.log(this.deviceImg);

        // this.star = s.rating;
      });
    });
  }

  deviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    oldprice: new FormControl(null),
    price: new FormControl(null, Validators.required),
    brandId: new FormControl(null, Validators.required),
    typeId: new FormControl(null, Validators.required),
    img: new FormControl(null, Validators.required),
  });

  /** Добавляет эллемент в корзину
   * @param item - товар
   */
  addToCart(item: Product) {
    if (!this.cartServer.itemInCart(item)) {
      // item.rating = 1;
      this.cartServer.addToCart(item); //add items in cart
      this.allItemsValue = [...this.cartServer.getItems()];
    }
  }

  itemValue: any;

  isCreateActive: boolean = false;

  value: any;

  /** Создает новый девайс
   * @param device - товар
   */
  createNewDevice(item?: any, result?: string) {
    const formData = new FormData();
    formData.append('name', this.deviceForm.get('name')?.value);
    formData.append('oldprice', this.deviceForm.get('oldprice')?.value);
    formData.append('price', this.deviceForm.get('price')?.value);
    formData.append('brandId', this.deviceForm.get('brandId')?.value);
    formData.append('typeId', this.deviceForm.get('typeId')?.value);
    formData.append('img', this.deviceForm.get('img')?.value);

    this.productsApi.addDevice(formData).subscribe((res) => {
      console.log(res);
      alert('Uploaded Successfully.');
      this.devicesArray.push(formData);
      this.getAllProducts();
    });
    // this.value = {
    //   name: this.deviceForm.get('name')?.value,
    //   oldprice: this.deviceForm.get('oldprice')?.value,
    //   price: this.deviceForm.get('price')?.value,
    //   brandId: this.deviceForm.get('brandId')?.value,
    //   typeId: this.deviceForm.get('typeId')?.value,
    //   img: this.fileEvent.name,
    // };
    this.devicesArray.push(formData);

    console.log(this.value);
  }

  updateDeviceValue(id: number, value: any) {
    value = new FormData();
    console.log(this.itemValueProduct);

    value.append('id', this.itemValueProduct.id.toString());
    value.append('name', this.deviceForm.get('name')?.value);
    value.append('oldprice', this.deviceForm.get('oldprice')?.value);
    value.append('price', this.deviceForm.get('price')?.value);
    value.append('brandId', this.deviceForm.get('brandId')?.value);
    value.append('typeId', this.deviceForm.get('typeId')?.value);
    value.append('img', this.deviceForm.get('img')?.value);
    this.productsApi.updateDeviceItem(id, value).subscribe((data) => {
      console.log(data, 'update');
    });
  }

  /** Удаляет девайс по ИД
   * @param id - ИД товара
   */
  deleteDevice(id: number) {
    this.productsApi.deleteDevice(id).subscribe(() => {
      this.devicesArray.splice(id, 1);
      this.getAllProducts();
    });
  }

  selectedFile!: File;
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0].name;
    console.log(this.selectedFile);
  }
  blob = new Blob([], { type: 'jpg' });

  fileEvent!: File;
  onFileChange(event: any) {
    // const form = document.forms.namedItem('fileinfo');

    // form?.addEventListener('submit', function (ev) {});

    this.fileEvent = event.target.files[0];
  }
  uploadData: any;
  // onUpload() {
  //   this.uploadData = new FormData();
  //   this.uploadData.append('myFile', this.fileEvent, this.fileEvent.name);
  //   this.http
  //     .post('http://localhost:7000/api/device', this.uploadData)
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: this.isDeleted ? 'Удаление товара' : 'Добавление нового товара',
        size,
        closeable: false,
      })
      .subscribe();
  }

  editMode: boolean = false;
  updateDevice(id: number) {
    let currentDevice = this.devicesArray.find((p) => {
      return p.id === id;
    });
    // this.productsApi.updateDevice(id);

    this.deviceForm.setValue({
      brandId: currentDevice.brandId,
      typeId: currentDevice.typeId,
      name: currentDevice.name,
      price: currentDevice.price,
      img: currentDevice.img,
      rating: currentDevice.rating,
    });

    // this.productsApi.updateDevice(id).subscribe((idItem:any)=>{
    //   this.devicesArray
    // })
    this.editMode = true;
  }

  id!: number;

  typesNames: Dictionary<string> = TypeDictionary;

  // ratingStars(item: any) {
  //   this.devicesArray.find((p) => {
  //     this.id = p.id;
  //     this.isHeartActive[item] = true;
  //   });

  //   // this.isHeartActive = !this.isHeartActive;
  // }

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
  ChannelSplit = 1,
  columnedSplit,
  FloorCeiling,
  cassette,
}

export const TypeDictionary: Dictionary<string> = {
  [TypesSplit.ChannelSplit]: 'Канальные сплит-системы',
  [TypesSplit.columnedSplit]: 'Колонные сплит-системы',
  [TypesSplit.FloorCeiling]: 'Напольно-потолочные сплит-системы',
  [TypesSplit.cassette]: 'Кассетные сплит-системы',
};

export enum BrandsSplit {
  Bosch = 1,
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

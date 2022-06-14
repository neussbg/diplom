import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { BrandsService } from 'src/app/pages/services/brands.service';
import { ProductsService } from 'src/app/pages/services/products.service';
import { IspitType, TypesService } from 'src/app/pages/services/types.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { typeConditioners } from 'src/assets/const/products/types-conditioners';
import { Subject, takeUntil } from 'rxjs';

export interface brand {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss'],
})
export class CategorySettingsComponent implements OnInit, OnDestroy {
  constructor(
    private typeApi: TypesService,
    private brandApi: BrandsService,
    private deviceApi: ProductsService,
    private readonly alertService: TuiAlertService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @ViewChild('content', { static: true }) contentType?: any;

  @ViewChild('contentUpdate', { static: true }) contentBrand?: any;

  @ViewChild('contentAdd', { static: true }) contentAdd!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('contentDelete', { static: true }) contentDelete?: any;

  /** Мок для типа кондиционеров */
  type = typeConditioners;

  /** Мок для бренда кондиционеров */
  // brands = brandsConditioners;

  /** Мок серии */
  series = [7, 9, 12, 18, 24, 30, 36];

  flag?: boolean;

  deviceId!: number;

  types: any[] = [];

  brands: any[] = [];

  brandName!: string;

  isActiveType: Array<boolean> = [];

  isChangeType: boolean = false;

  isChangeBrand: boolean = false;

  /** Subject для отслеживания уничтожения компоненты */
  destroy$ = new Subject<void>();

  @Input() brandId?: number;

  @Input() isAdmin: boolean = false;

  filterItemsValue: any[] = [];

  readonly min = 5;
  readonly max = 150;
  readonly sliderStep = 1;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  readonly control = new FormControl([this.min, this.max / 2]);

  ngOnInit(): void {
    this.getAllTypes();
    this.getAllBrands();

    // this.deviceApi.filterSubject.subscribe((data) => {
    //   this.filterItemsValue.push(data);
    // });
  }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: this.isAddedBrand
          ? 'Добавление нового бренда сплит системы'
          : this.isEdit
          ? 'Изменение бренда сплит системы'
          : 'Удаление бренда сплит системы',
        size,
        closeable: false,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {},
      });
  }

  filterTypeArray: any[] = [];

  filterBrandArray: any[] = [];
  filterBrandId!: number;
  filterTypeId!: number;

  test = new Object();
  filterSetType = new Set();
  filterSetBrand = new Set();
  getItemTypeValue(value: any) {
    this.isActiveType[value.id] = !this.isActiveType[value.id];
    this.filterTypeId = value.id;
    this.filterTypeArray.push(this.filterTypeId);
    this.filterSetType = new Set(this.filterTypeArray);
  }

  getItemBrandValue(value: any) {
    debugger;
    this.filterBrandId = value.id;
    this.filterBrandArray.push(this.filterBrandId);
    this.filterSetBrand = new Set(this.filterBrandArray);
    console.log(this.filterSetBrand, 'brands');

    // this.filterArray.push(this.filterTypeId);
    // console.log(this.filterArray);
  }

  onClickType(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: this.isTypeActive
          ? 'Добавление нового типа сплит системы'
          : this.isTypeEdit
          ? 'Изменение типа сплит системы'
          : 'Удаление типа сплит системы',
        size,
        closeable: false,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {
          this.isClose = true;
        },
      });
  }

  isClose: boolean = false;
  addTypeForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  selectConditonersForm: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    brand: new FormControl(this.flag, Validators.required),
    inventor: new FormControl(null, Validators.required),
    series: new FormControl(null, Validators.required),
  });

  isBrandActive: boolean = false;

  isTypeActive: boolean = false;

  isTypeEdit: boolean = false;

  oneItem: any;

  addBrandForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    // brandCheckbox: new FormControl(false),
  });

  onSumbit(item?: any) {
    debugger;
    if (this.isAddedBrand || this.isTypeActive) {
      if (this.isAddedBrand) {
        this.addBrand(item, 'Брен товара был успешно добавлен');
        this.isClose = true;
      } else {
        this.addType(item, 'Тип товара был успешно добавлен');
      }
    } else if (this.isEdit || this.isTypeEdit) {
      if (this.isEdit) {
        this.updateBrand(item.id, item, 'Бренд товара был успешно изменен');
      } else {
        this.updateType(item.id, item, 'Тип товара был успешно изменен');
      }
    } else if (this.isDeletedBrand || this.isDeletedType) {
      if (this.isDeletedBrand) {
        this.deleteBrand(item, 'Бренд товара был успешно удален');
      } else if (this.isDeletedType) {
        this.deleteType(item, 'Тип товара был успешно удален');
      }
    }
  }

  getItemToCreat(getValueEdit: boolean, item?: any) {
    debugger;
    console.log(getValueEdit);

    if (getValueEdit === this.isAddedBrand) {
      this.onClick(this.contentAdd, 'l');
      this.addBrandForm.reset();
    } else if (getValueEdit === this.isTypeActive) {
      this.onClickType(this.contentAdd, 'l');
      this.addTypeForm.reset();
    }
    // this.isAddedBrand = true;
  }

  brandValue: any;

  typeValue: any;

  itemValue: any;

  isAddedBrand: boolean = false;

  isEdit: boolean = false;

  isDeletedType: boolean = false;

  isDeletedBrand: boolean = false;

  geOneItem(item: any) {
    this.itemValue = item;
    // this.addBrandForm.patchValue({
    //   id: this.itemValue.id,
    //   name: this.itemValue.name,
    // });
    this.onClick(this.contentType, 'l');
  }

  filterItems(filterType?: any, filterBrand?: any) {
    if (filterType.size > 0) {
      filterType = Array.from(this.filterSetType);
      this.deviceApi.filterTypeSub(filterType);
    } else if (filterBrand.size > 0) {
      filterBrand = Array.from(this.filterSetBrand);
      this.deviceApi.filterBrandSub(filterBrand);
    }
    // if (filterType) {
    //   filterType = Array.from(this.filterSetType);
    //   this.deviceApi.filterTypeSub(filterType);
    // }
    // const merget = new Array([...this.filterSetType, ...this.filterSetBrand]);

    // this.deviceApi.filterSubject.subscribe((data) => {
    //   data.map((s) => {});
    // });
    // console.log(filterType);
  }
  getItemToUpdate(item: any, getValueEdit?: boolean) {
    debugger;
    this.itemValue = item;

    if (getValueEdit === this.isEdit) {
      this.onClick(this.contentBrand, 'l');
      this.addBrandForm.setValue({
        name: this.itemValue.name,
      });
      // this.addBrandForm.reset();
    } else if (getValueEdit === this.isTypeEdit) {
      this.onClickType(this.contentBrand, 'l');
      // this.addTypeForm.reset();
      this.addTypeForm.setValue({
        name: this.itemValue.name,
      });
    } else {
      this.addBrandForm.reset();
      this.addTypeForm.reset();
    }
    // this.isEdit = true;
    // this.addBrandForm.setValue({
    //   name: this.itemValue.name,
    // });
    // this.onClick(this.contentBrand, 'l');
  }

  valueId!: number;

  getItemToDelete(item: any, getValueDelete?: boolean) {
    debugger;
    this.valueId = item;
    this.isEdit = false;
    if (getValueDelete === this.isDeletedBrand) {
      this.onClick(this.contentDelete, 'l');
    } else if (this.isDeletedType == getValueDelete) {
      this.onClickType(this.contentDelete, 'l');
    }
    // this.isDeleted = true;
  }

  /** Brands */
  getAllBrands() {
    this.brandApi.getBrands().subscribe((item) => {
      this.brands = item;
      item.forEach((s: brand) => {
        this.brandValue = s;
      });
      console.log(this.brands);
    });
  }

  addBrand(item: brand, result?: string) {
    // this.isAdded = true;
    this.brandApi.addBrand(item).subscribe((data) => {
      this.brands.push(data);
      this.getAllBrands();
    });
    this.alertService.open(result as string).subscribe();
  }

  deleteBrand(id: number, result?: string) {
    this.brandApi.deleteBrand(id).subscribe(() => {
      this.brands.splice(id, 1);
      this.getAllBrands();
    });
    this.alertService.open(result as string).subscribe();
  }

  updateBrand(id: number, item: any, result?: string) {
    this.brandApi.updateBrand(id, item).subscribe(() => {
      this.getAllBrands();
    });
    this.alertService.open(result as string).subscribe();
  }

  /** Types */
  getAllTypes() {
    this.typeApi.getTypes().subscribe((item) => {
      this.types = item;
      item.forEach((s) => {
        this.typeValue = s;
      });
    });
  }

  addType(item: IspitType, result?: string) {
    this.typeApi.createType(item).subscribe((data) => {
      this.types.push(data);
      this.getAllTypes();
    });
    this.alertService.open(result as string).subscribe();
  }

  deleteType(id: number, result?: string) {
    this.typeApi.deleteType(id).subscribe(() => {
      /**не работает */
      this.types.splice(id, 1);
      this.getAllTypes();
    });
    this.alertService.open(result as string).subscribe();
  }

  updateType(id: number, item: IspitType, result?: string) {
    this.typeApi.updateType(id, item).subscribe(() => {
      this.getAllTypes();
    });
    this.alertService.open(result as string).subscribe();
  }

  cancel(value: any) {
    console.log(value);
    this.isEdit = false;
    this.isAddedBrand = false;
    this.isDeletedBrand = false;
    // this.addBrandForm.reset(value);
    // if (!this.isAdded || !this.isDeleted) {
    //   this.addBrandForm.reset();
    // }
  }

  cancelAdd() {
    this.isAddedBrand = false;
  }
}

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
import { IPower, PowerService } from 'src/app/pages/services/power.service';
import { Router } from '@angular/router';
import { SanitizeStyle } from '@tinkoff/ng-dompurify';

export interface IBrand {
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
    private powerApi: PowerService,
    private readonly alertService: TuiAlertService,
    private router: Router,
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

  @ViewChild('contentPowerDelete', { static: true }) contentPowerDelete?: any;

  @ViewChild('contentPowerCreate', { static: true }) contentPowerCreate?: any;

  @ViewChild('contentPowerUpdate', { static: true }) contentPowerUpdate?: any;

  /** Мок для типа кондиционеров */
  type = typeConditioners;


  powersArray: any[] = [];

  flag?: boolean;

  deviceId!: number;

  typesArray: any[] = [];

  brandsArray: any[] = [];

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
    this.getAllPowers();

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
          : this.isEditBrand
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

  onClickPower(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: this.isUpdatePower
          ? 'Изменение текущей мощности'
          : this.isCreatePower
          ? 'Добавление новой мощности'
          : 'Удаление мощностит',
        size,
        closeable: false,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => {},
      });
  }

  IsCloseWindow: boolean = false;
  filterTypeArray: any[] = [];

  filterBrandArray: any[] = [];
  filterBrandId!: number;
  filterTypeId!: number;
  itemFilterActive: any;
  test = new Object();
  filterSetType = new Set();
  filterSetBrand = new Set();
  getItemTypeValue(value: any) {
    this.itemFilterActive = value;
    this.isActiveType[value.id] = !this.isActiveType[value.id];
    this.filterTypeId = value.id;
    this.filterTypeArray.push(this.filterTypeId);
    this.filterSetType = new Set(this.filterTypeArray);
  }

  getItemBrandValue(value: any) {
    this.filterBrandId = value.id;
    this.filterBrandArray.push(this.filterBrandId);
    this.filterSetBrand = new Set(this.filterBrandArray);
  }

  onClickType(
    content: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: this.isAddedType
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
  TypeForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  selectConditonersForm: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    brand: new FormControl(this.flag, Validators.required),
    inventor: new FormControl(null, Validators.required),
    series: new FormControl(null, Validators.required),
  });

  isBrandActive: boolean = false;

  isAddedType: boolean = false;

  isTypeEdit: boolean = false;

  oneItem: any;

  BrandForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  powerForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
  });

  // onSumbit(item?: any) {
  //   if (this.isAddedBrand || this.isAddedType) {
  //     if (this.isAddedBrand) {
  //       this.addBrand(item, 'Брен товара был успешно добавлен');
  //       this.isClose = true;
  //     } else {
  //       this.addType(item, 'Тип товара был успешно добавлен');
  //     }
  //   } else if (this.isEditBrand || this.isTypeEdit) {
  //     if (this.isEditBrand) {
  //       this.updateBrand(item.id, item, 'Бренд товара был успешно изменен');
  //     } else {
  //       this.updateType(item.id, item, 'Тип товара был успешно изменен');
  //     }
  //   } else if (this.isDeletedBrand || this.isDeletedType) {
  //     if (this.isDeletedBrand) {
  //       this.deleteBrand(item, 'Бренд товара был успешно удален');
  //     } else if (this.isDeletedType) {
  //       this.deleteType(item, 'Тип товара был успешно удален');
  //     }
  //   }
  // }

  onSubmitBrand(item: any) {
    if (this.isAddedBrand) {
      this.addBrand(item, 'Брен товара был успешно добавлен');
      this.isClose = true;
    }

    if (this.isEditBrand) {
      this.updateBrand(item.id, item, 'Бренд товара был успешно изменен');
    }

    if (this.isDeletedBrand) {
      this.deleteBrand(item, 'Бренд товара был успешно удален');
    }
    this.BrandForm.disable();
  }

  onSubmitType(item: any) {
    if (this.isAddedType) {
      this.addType(item, 'Тип товара был успешно добавлен');
    }

    if (this.isTypeEdit) {
      this.updateType(item.id, item, 'Тип товара был успешно изменен');
    }

    if (this.isDeletedType) {
      this.deleteType(item, 'Тип товара был успешно удален');
    }
  }

  onSubmitPower(item: any, flag?: boolean) {
    if (this.isCreatePower) {
      this.addPower(item, 'Новая мощность была успешно добавлена');
    }
    if (this.isUpdatePower) {
      this.updatePower(item.id, item, 'Текущая мощность была успешно изменена');
    }

    if (this.isDeletePower) {
      this.deletePower(item, 'Данная мощность была успешно удалена');
    }
    // window.location.reload();
  }

  disabledButtonType: boolean = false;
  disabledButtonBrand: boolean = false;

  getItemToCreate(getValueEdit: boolean, item?: any) {
    // debugger;
    // console.log(getValueEdit);

    if (getValueEdit === this.isAddedBrand) {
      this.onClick(this.contentAdd, 'l');
      this.BrandForm.reset();
    }
    if (getValueEdit === this.isAddedType) {
      this.onClickType(this.contentAdd, 'l');
      this.TypeForm.reset();
    }

    if (getValueEdit === this.isCreatePower) {
      this.onClickPower(this.contentPowerCreate, 'l');
      this.powerForm.reset();
    }
    // this.isAddedBrand = true;
  }

  brandValue: any;

  typeValue: any;

  itemValue: any;

  isAddedBrand: boolean = false;

  isEditBrand: boolean = false;

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
    this.isActiveType[this.itemFilterActive.id] = false;
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

  checkInventorts() {}

  getItemToUpdate(item: any, getValueEdit?: boolean) {
    this.itemValue = item;

    if (getValueEdit === this.isEditBrand) {
      this.onClick(this.contentBrand, 'l');
      this.BrandForm.setValue({
        name: this.itemValue.name,
      });
    }

    if (getValueEdit === this.isTypeEdit) {
      this.onClickType(this.contentBrand, 'l');
      // this.addTypeForm.reset();
      this.TypeForm.setValue({
        name: this.itemValue.name,
      });
    }
    if (getValueEdit === this.isUpdatePower) {
      this.onClickPower(this.contentPowerUpdate, 'l');
      this.powerForm.setValue({
        name: this.itemValue.name,
      });
    } else {
      this.powerForm.reset();
      this.BrandForm.reset();
      this.TypeForm.reset();
    }
    // this.isEdit = true;
    // this.addBrandForm.setValue({
    //   name: this.itemValue.name,
    // });
    // this.onClick(this.contentBrand, 'l');
  }

  valueId!: number;

  getItemToDelete(item: any, getValueDelete?: boolean) {
    this.valueId = item;
    console.log(this.valueId);

    // this.isEditBrand = false;
    if (getValueDelete === this.isDeletedBrand) {
      this.onClick(this.contentDelete, 'l');
    }
    if (getValueDelete == this.isDeletedType) {
      this.onClickType(this.contentDelete, 'l');
    }
    if (getValueDelete == this.isDeletePower) {
      this.onClickPower(this.contentPowerDelete, 'l');
    }
    // this.isDeleted = true;
  }

  /** Powers */

  isUpdatePower: boolean = false;

  isDeletePower: boolean = false;

  isCreatePower: boolean = false;

  getAllPowers() {
    this.powerApi.getPowers().subscribe((data) => {
      this.powersArray = data;
    });
  }

  addPower(item: IPower, result?: string) {
    this.powerApi.createPower(item).subscribe((value) => {
      this.powersArray.push(value);
      this.getAllPowers();
    });
    this.alertService.open(result as string).subscribe();
  }

  deletePower(id: number, result?: string) {
    this.powerApi.deletePower(id).subscribe((data) => {
      this.powersArray.splice(id, 1);
      this.getAllPowers();
    });
    this.alertService.open(result as string).subscribe();
  }

  updatePower(id: number, item: IPower, result?: string) {
    this.powerApi.updatePower(id, item).subscribe(() => {
      this.getAllPowers();
    });
    this.alertService.open(result as string).subscribe();
  }

  // getPowerToCreate(getValueCreate: boolean, result?: string) {
  //   console.log('data');

  //   this.isCreatePower = getValueCreate;
  //   if (this.isCreatePower == true) {
  //     this.powerForm.reset();
  //     this.onClickPower(this.contentPowerCreate, 'l');
  //     this.alertService.open(result as string);
  //   }
  // }

  // getPowerToUpdate(item: IPower, getValueEdit: boolean, result?: string) {
  //   console.log(item);

  //   this.isUpdatePower = getValueEdit;
  //   this.powerId = item.id as number;
  //   if (this.isUpdatePower == true) {
  //     this.powerForm.setValue({
  //       name: item.name,
  //     });
  //     this.onClickPower(this.contentPowerCreate, 'l');
  //     this.alertService.open(result as string);
  //   } else {
  //     this.powerForm.reset();
  //   }
  // }

  // powerId!: number;
  // getPowerToDelete(id: number, getValueDelete: boolean, result?: string) {
  //   this.powerId = id;

  //   this.isDeletePower = getValueDelete;
  //   if (this.isDeletePower == true) {
  //     // this.powerApi.deletePower(id).subscribe(() => {
  //     //   this.powersArray.splice(id, 1);
  //     this.onClickPower(this.contentPowerCreate, 'l');
  //     // });
  //     this.alertService.open(result as string);
  //   }
  // }

  // onSubmitPowers(value: any, isClose: boolean) {
  //   // debugger;
  //   if (this.isCreatePower == true) {
  //     this.addPower(value, 'Новая мощность была успешно добавлена');
  //     this.getAllPowers();
  //   }
  //   if (this.isUpdatePower == true) {
  //     this.updatePower(
  //       this.powerId,
  //       value,
  //       'Текущая мощность была успешно изменена'
  //     );
  //     this.getAllPowers();
  //   }
  //   if (this.isDeletePower == true) {
  //     this.deletePower(this.powerId, 'Данная мощность была успешно удалена');
  //     this.getAllPowers();
  //   }
  // }

  cancelSumbtiPowers(flag: boolean) {
    this.isCreatePower = false;
    this.isUpdatePower = false;
    this.isDeletePower = false;
    // this.isClose = true;\
    this.IsCloseWindow = true;
  }

  /** Brands */
  getAllBrands() {
    this.brandApi.getBrands().subscribe((item) => {
      this.brandsArray = item;
      item.forEach((s: IBrand) => {
        this.brandValue = s;
      });
      // console.log(this.brands);
    });
  }

  addBrand(item: IBrand, result?: string) {
    // this.isAdded = true;
    this.brandApi.addBrand(item).subscribe((data) => {
      this.brandsArray.push(data);
      this.getAllBrands();
    });
    this.alertService.open(result as string).subscribe();
  }

  deleteBrand(id: number, result?: string) {
    this.brandApi.deleteBrand(id).subscribe(() => {
      this.brandsArray.splice(id, 1);
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
      this.typesArray = item;
      item.forEach((s) => {
        this.typeValue = s;
      });
    });
  }

  addType(item: IspitType, result?: string) {
    this.typeApi.createType(item).subscribe((data) => {
      this.typesArray.push(data);
      this.getAllTypes();
    });
    this.alertService.open(result as string).subscribe();
  }

  deleteType(id: number, result?: string) {
    this.typeApi.deleteType(id).subscribe(() => {
      /**не работает */
      this.typesArray.splice(id, 1);
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
    this.isEditBrand = false;
    this.isAddedBrand = false;
    this.isDeletedBrand = false;
    this.isAddedType = false;
    this.isTypeEdit = false;
    this.isDeletedType = false;
    this.isCreatePower = false;
    this.isUpdatePower = false;
    this.isDeletePower = false;
    // this.BrandForm.reset();
    // this.TypeForm.reset();
    // this.addBrandForm.reset(value);
    // if (!this.isAdded || !this.isDeleted) {
    //   this.addBrandForm.reset();
    // }
  }

  cancelAdd() {
    this.isAddedBrand = false;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/pages/services/brands.service';
import { ProductsService } from 'src/app/pages/services/products.service';
import { TypesService } from 'src/app/pages/services/types.service';
import { brandsConditioners } from 'src/assets/const/products/brands';
import { typeConditioners } from 'src/assets/const/products/types-conditioners';

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
export class CategorySettingsComponent implements OnInit {
  constructor(
    private typeApi: TypesService,
    private brandApi: BrandsService,
    private deviceApi: ProductsService
  ) {}

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

  @Input() brandId?: number;

  @Input() isAdmin: boolean = false;

  readonly min = 5;
  readonly max = 150;
  readonly sliderStep = 1;
  readonly steps = (this.max - this.min) / this.sliderStep;
  readonly quantum = 0.00001;
  readonly control = new FormControl([this.min, this.max / 2]);

  ngOnInit(): void {
    this.typeApi.getTypes().subscribe((item: any) => (this.types = item));
    this.brandApi.getBrands().subscribe((item) => {
      this.brands = item;
      item.forEach((s) => {
        this.brandId = s.id;
        console.log(s);
      });

      this.brands.map((s) => {
        this.brandId = s.id;
        this.brandApi.brandId.subscribe((s) => {
          this.brandId = s;
        });
      });

      this.deviceApi.getDevices().subscribe((item) => {
        item.rows.forEach((value) => {
          this.brandId = value.brandId;
        });
      });
      this.addBrandForm.valueChanges.subscribe((s) => {
        if (s.brandCheckbox === true) {
          console.log(s);
        }
      });
    });

    console.log(this.addBrandForm.getRawValue());

    console.log(this.addBrandForm.value);
  }

  /** Создает новый бренд */
  addNewBrand() {}

  selectConditonersForm: FormGroup = new FormGroup({
    type: new FormControl(null, Validators.required),
    brand: new FormControl(this.flag, Validators.required),
    inventor: new FormControl(null, Validators.required),
    series: new FormControl(null, Validators.required),
  });

  isBrandActive: boolean = false;

  addBrandForm: FormGroup = new FormGroup({
    brandName: new FormControl(this.brandId, Validators.required),
    brandCheckbox: new FormControl(false),
  });

  // brandName = new FormControl(null, Validators.required);

  itemValue: any;
  addBrand(item: brand) {
    this.brandApi.addBrand(this.addBrandForm.value).subscribe((data) => {
      this.itemValue = data;
      this.brands.push(this.itemValue);
    });
  }

  deleteBrand(id: number) {
    this.brandApi.deleteBrand(id).subscribe((idItem: any) => {
      this.brands.splice(idItem, 1);
    });
  }
}

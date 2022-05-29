import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from 'express';
import { forkJoin, map, Observable, switchMap, takeUntil } from 'rxjs';
import { CardService } from '../services/card.service';
import {
  Product,
  ProductsService,
  ItemsCount,
} from '../services/products.service';

export const FactoryData = [
  {
    name: 'Гарантия',
    value: '1 год',
  },
  {
    name: 'Cтрана',
    value: 'Китай',
  },
  {
    name: 'Срок службы',
    value: '7 лет',
  },
  {
    name: 'Серия',
    value: 'Tundra Basic',
  },
];

export const IndoorUnitData = [
  {
    name: 'Размер внутр. блока(В*Ш*Г)',
    value: '26,3*70,8*19,0 см',
  },
  {
    name: 'Цвет внутреннего блока',
    value: 'белый',
  },
  {
    name: 'Вес внутреннего блока',
    value: '7.3 кг',
  },
];

export const OutdoorUnit = [
  {
    name: 'Размер внеш. блока(В*Ш*Г)',
    value: '43,2*69,6*25,6 см',
  },
  {
    name: 'Цвет внешнего блока',
    value: 'белый',
  },
  {
    name: 'Вес внешнего блока',
    value: '20.9 кг',
  },
];

export const Performance = [
  {
    name: 'Реком. площадь (высота 2.6)',
    value: 'до 20кв. м',
  },
  {
    name: 'Охлаждающая способность',
    value: '7000 BTU',
  },
  {
    name: 'Производ-ть по холоду',
    value: '2.05 кВт',
  },
  {
    name: 'Производ-ть по теплу',
    value: '2.05 кВт',
  },
  {
    name: 'Внешняя темп. (охлаждение)',
    value: '+18 ~ +43*С',
  },
];

export const itemImg = [
  {
    id: 1,
    src: 'condWithPult',
  },
  {
    id: 2,
    src: 'pult',
  },
  {
    id: 3,
    src: 'littleCond',
  },
  {
    id: 4,
    src: 'littleCond',
  },
];

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  id!: number;

  factoryDataList = FactoryData;

  IndoorUnitDataList = IndoorUnitData;

  OutdoorUnitList = OutdoorUnit;

  PerformanceList = Performance;

  imgList = itemImg;

  imgSrc = '';

  isActiveImg: boolean = false;

  data: any;
  cardData: Product[] = [];
  constructor(
    private ApiService: ProductsService,
    private cartApi: CardService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((data: Params) => {
      this.data = data;
    });
  }
  productId!: number;

  isDescription: boolean = true;

  isCharacters: boolean = false;

  isActiveButton: boolean = false;

  public products: any[] = [];
  public grandTotal: number = 0;

  product!: Observable<ItemsCount<Product[]>>;
  ngOnInit(): void {
    this.currentImg = 'http://localhost:7000/' + this.data.img;
  }

  showDescription() {
    this.isDescription = true;
    this.isCharacters = false;
    this.isActiveButton = false;
  }

  showCharacters() {
    this.isActiveButton = true;
    this.isCharacters = true;
    this.isDescription = false;
  }

  currentImg = '';

  changeImg(img: string) {
    this.imgSrc = 'assets/img/product/' + img + '.svg';
    this.isActiveImg = !this.isActiveImg;
  }
}

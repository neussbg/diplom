import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from 'express';
import { forkJoin, map, Observable, switchMap, takeUntil } from 'rxjs';
import { CardService } from '../services/card.service';
import {
  Product,
  ProductsService,
  Response,
} from '../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    private ApiService: ProductsService,
    private cartApi: CardService,
    private route: ActivatedRoute
  ) {}
  productId!: number;

  public products: any[] = [];
  public grandTotal: number = 0;

  test: any;

  product!: Observable<Response<Product[]>>;
  ngOnInit(): void {
    // this.cartApi.getProducts().subscribe((res)=>{
    //   this.product = res;
    //   this.grandTotal = this.cartApi.getTotalPrice()
    // })

    this.route.params.pipe(
      switchMap((params: Params): any => {
        console.log(params);
        this.productId = params['id'] || '';
        console.log(this.productId, 'test');
        return forkJoin([this.ApiService.getDevicesById(this.productId)]);
      })
    );
    // const id = +this.route.snapshot.params['id'];
    // this.test = this.productApi.getDevicesById(id);
  }
}

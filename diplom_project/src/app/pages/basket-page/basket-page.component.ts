import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TuiPortalService } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { CardService } from '../services/card.service';
import { CartService } from '../services/cart.service';
import { NavigationService } from '../services/navigation.service';
import { Product, ProductsService } from '../services/products.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { TOKEN_KEY } from '../services/auth.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketPageComponent implements OnInit {
  constructor(
    private cartApi: CardService,
    private navApi: NavigationService,
    private cartService: CartService,
    private http: HttpClient,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService,
    private productApi: ProductsService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}
  @ViewChildren('totalElementCount') totalElementCount!: QueryList<ElementRef>;
  @ViewChildren('subTotalWrap_existing')
  subTotalItems_existing?: QueryList<ElementRef>;

  @ViewChild('content', { static: true }) content!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('header', { static: true }) header!: TemplateRef<any>;

  @ViewChild('contentMessageRequest', { static: true })
  contentMessageRequest!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('headerMessageRequest', { static: true })
  headerMessageRequest!: TemplateRef<any>;

  items: any[] = [];

  totalCount: number = 0;

  isActive: boolean = false;

  userName: string = '';

  itemsArray: Product[] = [];
  public products: any = [];
  public grandTotal!: number;

  confirmBuyForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  Object = Object;

  email: any;

  itemValue!: string;
  requestData: any[] = [];
  ngOnInit(): void {
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
    this.testSub.subscribe((data) => {
      console.log(data);
    });

    this.testSub.subscribe((data) => {
      console.log(data);
    });

    this.cartService.itemsList$.subscribe((data) => {
      this.totalCount = data.length;
    });

    let obj = JSON.parse(localStorage.getItem('cart_items') as string);

    this.email = localStorage.getItem('auth-login');
    for (let item of obj) {
      item = `Наименование товара :${item.name} - ${item.price}руб. : кол-во товара ${this.qty}`;

      this.requestData.push(item);
    }
  }

  get total() {
    return this.items.reduce(
      (totalCount, element) => ({
        count: 1,
        price: totalCount.price + element.count * element.price,
      }),
      { count: 1, price: 0 }
    ).price;
  }

  objValue = {};

  showIfFormRequare(item: any) {
    // this.objValue = {
    //   email: this.email,
    //   data: this.requestData,
    //   phone: item.phone,
    // };

    console.log(item);

    this.userName = item.name;

    this.onSubmitRequest(
      this.contentMessageRequest,
      this.headerMessageRequest,
      's'
    );
  }
  onSubmitRequest(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: 'Ура! Ваш заказ оформлен',
        header,
        size,
        closeable: true,
      })
      .subscribe();
    this.sendMail().subscribe((data) => console.log(data));
    this.confirmBuyForm.reset();
  }

  public sendMail() {
    return this.http
      .post('https://formspree.io/f/mnqwwand', {
        name: this.userName,
        email: this.email,
        phone: this.confirmBuyForm.get('phone')?.value,
        devices: this.requestData,
      })
      .pipe(map((res) => console.log(res)));
  }

  get getTotalItem() {
    return true;
  }
  qty: number = 1;

  totals!: number;

  testSub = new BehaviorSubject(this.totals);

  totalPriceElement(item: any, index: number) {
    this.testSub.next(item.count);
    const amt = item.price;
    const subTotal = amt * item.count;
    this.totalElementCount.toArray()[index].nativeElement.innerHTML = subTotal;

    this.cartService.saveCart();
  }

  //----- remove specific item
  removeFromCart(item: any) {
    this.cartService.removeItem(item);
    this.requestData.splice(item, 1);
    this.items = this.cartService.getItems();
  }

  //----- clear cart item
  clearCart(items: any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }

  removeItem(index: number) {
    this.itemsArray.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.itemsArray));
  }

  // emptyCart() {
  //   this.cartApi.removeAllCartItems();
  // }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: 'Оформление заявки на покупку',
        header,
        size: 's',
        closeable: false,
        dismissible: false,
      })
      .subscribe();
  }

  requestToBuy() {
    if (localStorage.getItem(TOKEN_KEY)) {
      this.onClick(this.content, this.header, 's');
    } else {
      this.navApi.navigateTo('login');
    }
  }
}

// goToProductList(route: string) {
//   this.navApi.navigateTo(route);
// }

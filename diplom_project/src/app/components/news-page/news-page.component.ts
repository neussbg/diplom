import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthService, TOKEN_KEY } from 'src/app/pages/services/auth.service';
import { CardService } from 'src/app/pages/services/card.service';
import { CartService } from 'src/app/pages/services/cart.service';
import { Routes } from 'src/assets/const/route.data';
import { NavigationService } from '../../pages/services/navigation.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  constructor(
    private navigate: NavigationService,
    private cardApi: CardService,
    private cartService: CartService,
    private tokenStorage: TokenStorageService,
    private auth: AuthService
  ) {}

  /** Маршруты */
  routes? = Routes;

  totalItems: number = 0;

  items: any[] = [];

  test: any[] = [];

  roles!: string[];
  authority!: string;

  totalItems$ = new BehaviorSubject<number>(this.totalItems);

  totalCount!: number;

  isLogginIn: boolean = false;

  /** Флаг переключения темы */
  @Input() changerTheme: boolean = false;

  /** Флаг изменения события переключения темы   */
  @Output() eventChangeThemeToggle = new EventEmitter<boolean>();

  item: any;

  loginName!: string;

  isLoggin: boolean = false;
  value: any;
  ngOnInit(): void {
    if (localStorage.getItem(TOKEN_KEY)) {
      this.isLogginIn = true;
    }
    if (localStorage.getItem('auth-login') !== null) {
      this.isLoggin = true;
      this.loginName = localStorage.getItem('auth-login') as string;
    } else {
      this.isLoggin = false;
    }

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every((role) => {
        if (role === 'ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'USER') {
          this.authority = 'user';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    // this.totalCont = JSON.parse(
    //   localStorage.getItem('cart_items') as string
    // ).length;
    // console.log(
    //   JSON.stringify(JSON.parse(localStorage.getItem('auth-login') as string))
    // );

    // this.value = JSON.parse(localStorage.getItem('auth-login') as string);
    this.cartService.itemsList$.subscribe((data) => {
      this.totalCount = data.length;
    });

    this.auth.loginList.subscribe((data) => {});

    this.loginName = localStorage.getItem('auth-login') as string;

    // this.getProductList();
    const ss = this.cartService.loadCart();
    this.items = this.cartService.getItems();
    // this.cartService.getProducts().subscribe((s) => {
    //   this.test.push(s);
    //   console.log(this.test);
    // });
    // this.cartService.item$.subscribe((s) => {
    //   console.log(s);
    // });
  }

  loggout() {
    window.localStorage.clear();
    window.location.reload();
  }

  getProductList() {
    this.cardApi.getProducts().subscribe(() => {
      this.item = JSON.parse(localStorage.getItem('items') as string) || null;
      this.totalItems = this.item.length;
      this.totalItems = this.cardApi.cartItemsList.length;
      // console.log(this.totalItems, 'items');
    });
  }

  /** Перенаправляет на страницу */
  redirectTo(route?: string): void {
    this.navigate.navigateTo(route as string);
  }

  /** Пеерключает тему приложения */
  onChangeTheme() {
    console.log(this.changerTheme);
    this.navigate.themeSubject.next(this.changerTheme);

    this.changerTheme = !this.changerTheme;
    this.eventChangeThemeToggle.emit(this.changerTheme);
  }
}

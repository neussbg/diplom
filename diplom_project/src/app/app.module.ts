import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TUI_SANITIZER,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiLabelModule,
  TuiDataListModule,
  TuiButtonModule,
} from '@taiga-ui/core';
import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { EmptyPageComponent } from './pages/empty-page/empty-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AttendancePageComponent } from './pages/attendance-page/attendance-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SwiperModule } from 'swiper/angular';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import {
  TuiActionModule,
  TuiCheckboxModule,
  TuiComboBoxModule,
  TuiDataListWrapperModule,
  TuiInputRangeModule,
  TuiPaginationModule,
  TuiRatingModule,
  TuiSelectModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { AuthorizationComponent } from './authorization/authorization.component';
import { environment } from 'src/environments/environment.prod';
import { ENVIRONMENT, TaskService } from './pages/services/task.service';
import { ProductCardComponent } from './pages/product-card/product-card.component';
import { CurrencyPipe } from '@angular/common';
import { ItemsComponent } from './components/items/items.component';
import { CategorySettingsComponent } from './components/category-settings/category-settings.component';
import { AuthService } from './pages/services/auth.service';
import { BannerComponent } from './components/banner/banner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegistrationPageComponent } from './auth/registration-page/registration-page.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './auth/token-interceptor';

export const mapConfig: YaConfig = {
  apikey: 'b1484602-759f-463f-9f27-0d8191d4c5cb',
  lang: 'en_US',
};

export function initApp(configurationService: TaskService) {
  return () => configurationService.load().toPromise();
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProductsPageComponent,
    BasketPageComponent,
    CompanyPageComponent,
    UserPageComponent,
    EmptyPageComponent,
    FooterComponent,
    CategoriesComponent,
    AttendancePageComponent,
    NewsPageComponent,
    ContactsPageComponent,
    AuthorizationComponent,
    ProductCardComponent,
    ItemsComponent,
    CategorySettingsComponent,
    BannerComponent,
    RegistrationPageComponent,
    LoginComponent,
    UserComponent,
    HomePageComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTextAreaModule,
    TuiInputRangeModule,
    TuiRootModule,
    TuiPaginationModule,
    TuiRatingModule,
    TuiDialogModule,
    BrowserAnimationsModule,
    TuiDataListModule,
    NgxPaginationModule,
    TuiDataListWrapperModule,
    TuiNotificationsModule,
    TuiSvgModule,
    TuiComboBoxModule,
    TuiCheckboxModule,
    TuiSelectModule,
    TuiLabelModule,
    FilterPipeModule,
    TuiThemeNightModule,
    TuiActionModule,
    TuiModeModule,
    SwiperModule,
    AngularYandexMapsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [
    CurrencyPipe,
    AuthService,
    { provide: httpInterceptorProviders, useValue: undefined },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [TaskService],
    },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: ENVIRONMENT, useValue: environment },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

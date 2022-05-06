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
} from '@taiga-ui/core';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AttendancePageComponent } from './pages/attendance-page/attendance-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { NewsPageComponent } from './components/news-page/news-page.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SwiperModule } from 'swiper/angular';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import {
  TuiCheckboxModule,
  TuiDataListWrapperModule,
  TuiInputRangeModule,
} from '@taiga-ui/kit';
import { AuthorizationComponent } from './authorization/authorization.component';
import { environment } from 'src/environments/environment.prod';
import { ENVIRONMENT, TaskService } from './pages/services/task.service';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputRangeModule,
    TuiRootModule,
    TuiDialogModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiNotificationsModule,
    TuiSvgModule,
    TuiCheckboxModule,
    TuiLabelModule,
    FilterPipeModule,
    TuiThemeNightModule,
    TuiModeModule,
    SwiperModule,
    AngularYandexMapsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
  ],
  providers: [
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

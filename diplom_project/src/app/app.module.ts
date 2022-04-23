import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TUI_SANITIZER,
  TuiSvgModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiSvgModule,
    FilterPipeModule,
    SwiperModule
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}

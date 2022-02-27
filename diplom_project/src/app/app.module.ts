import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProductsPageComponent,
    BasketPageComponent,
    NewsPageComponent,
    RegistrationPageComponent,
    CompanyPageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

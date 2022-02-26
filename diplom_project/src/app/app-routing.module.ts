import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    data: { title: 'main' }
  },
  {
    path: 'news',
    component: NewsPageComponent,
    data: { title: 'news' }
  },
  {
    path: 'products',
    component: ProductsPageComponent,
    data: { title: 'products' }
  },
  {
    path: 'basket',
    component: BasketPageComponent,
    data: { title: 'basket' }
  },
  {
    path: 'company',
    component: CompanyPageComponent,
    data: { title: 'company' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { AttendancePageComponent } from 'src/app/pages/attendance-page/attendance-page.component';
import { BasketPageComponent } from 'src/app/pages/basket-page/basket-page.component';
import { CompanyPageComponent } from 'src/app/pages/company-page/company-page.component';
import { ContactsPageComponent } from 'src/app/pages/contacts-page/contacts-page.component';
import { EmptyPageComponent } from 'src/app/pages/empty-page/empty-page.component';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { NewsPageComponent } from 'src/app/components/news-page/news-page.component';
import { ProductsPageComponent } from 'src/app/pages/products-page/products-page.component';
import { RouterEnum } from '../enums/router.enum';
import { AuthorizationComponent } from 'src/app/authorization/authorization.component';
import { ProductCardComponent } from 'src/app/pages/product-card/product-card.component';
import { RegistrationPageComponent } from 'src/app/auth/registration-page/registration-page.component';
import { AuthGuard } from 'src/app/classes/auth.guard';

/** Маршрутизация */
export const routes: Routes = [
  {
    path: RouterEnum.mainPage,
    component: MainPageComponent,
  },
  {
    path: RouterEnum.newsPage,
    component: NewsPageComponent,
  },
  {
    path: RouterEnum.productsPage,
    children: [
      {
        path: 'card',
        component: ProductCardComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: ProductsPageComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'products/:id',
    component: ProductCardComponent,
  },
  {
    path: RouterEnum.basketPage,
    // canActivate: [AuthGuard],
    component: BasketPageComponent,
  },
  {
    path: RouterEnum.companyPage,
    component: CompanyPageComponent,
  },
  // {
  //   path: RouterEnum.accoutPage,
  //   component: AuthorizationComponent,
  // },
  {
    path: RouterEnum.contacts,
    component: ContactsPageComponent,
  },
  {
    path: RouterEnum.attendance,
    component: AttendancePageComponent,
  },
  // {
  //   path: '**',
  //   component: RegistrationPageComponent,
  // },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },

  {
    path: 'login',
    component: AuthorizationComponent,
  },
  {
    path: ' ',
    redirectTo: 'registration',
    pathMatch: 'full',
  },
];

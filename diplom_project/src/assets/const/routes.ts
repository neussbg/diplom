import { Routes } from '@angular/router';
import { AttendancePageComponent } from 'src/app/pages/attendance-page/attendance-page.component';
import { BasketPageComponent } from 'src/app/pages/basket-page/basket-page.component';
import { CompanyPageComponent } from 'src/app/pages/company-page/company-page.component';
import { ContactsPageComponent } from 'src/app/pages/contacts-page/contacts-page.component';
import { EmptyPageComponent } from 'src/app/pages/empty-page/empty-page.component';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { NewsPageComponent } from 'src/app/components/news-page/news-page.component';
import { ProductsPageComponent } from 'src/app/pages/products-page/products-page.component';
import { UserPageComponent } from 'src/app/pages/user-page/user-page.component';
import { RoutingPath } from '../enums/router.enum';
import { AuthorizationComponent } from 'src/app/authorization/authorization.component';

export const routes: Routes = [
  {
    path: RoutingPath.mainPage,
    component: AuthorizationComponent,
  },
  {
    path: RoutingPath.newsPage,
    component: NewsPageComponent,
  },
  {
    path: RoutingPath.productsPage,
    component: ProductsPageComponent,
  },
  {
    path: RoutingPath.basketPage,
    component: BasketPageComponent,
  },
  {
    path: RoutingPath.companyPage,
    component: CompanyPageComponent,
  },
  {
    path: RoutingPath.accoutPage,
    component: UserPageComponent,
  },

  {
    path: RoutingPath.contacts,
    component: ContactsPageComponent,
  },
  {
    path: RoutingPath.attendance,
    component: AttendancePageComponent,
  },
  {
    path: '**',
    component: EmptyPageComponent,
  },
];

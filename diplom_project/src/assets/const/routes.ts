import { Routes } from "@angular/router";
import { BasketPageComponent } from "src/app/pages/basket-page/basket-page.component";
import { CompanyPageComponent } from "src/app/pages/company-page/company-page.component";
import { MainPageComponent } from "src/app/pages/main-page/main-page.component";
import { NewsPageComponent } from "src/app/pages/news-page/news-page.component";
import { ProductsPageComponent } from "src/app/pages/products-page/products-page.component";
import { RegistrationPageComponent } from "src/app/pages/registration-page/registration-page.component";
import { UserPageComponent } from "src/app/pages/user-page/user-page.component";
import { RoutingPath } from "../enums/router.enum";



export const routes: Routes = [
  {
    path: RoutingPath.mainPage,
    component: MainPageComponent
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
  }

]
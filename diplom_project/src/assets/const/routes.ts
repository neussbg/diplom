import { Routes } from "@angular/router";
import { MainPageComponent } from "src/app/pages/main-page/main-page.component";
import { NewsPageComponent } from "src/app/pages/news-page/news-page.component";



const routes: Routes = [
    {
      path: 'main',
      component: MainPageComponent,
      data: { title: 'main' }
    },
    {
      path: 'about',
      component: NewsPageComponent,
      data: { title: 'About Me' }
    }
  ];
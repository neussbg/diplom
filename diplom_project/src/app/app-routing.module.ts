import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserComponent } from './pages/user/user.component';
import { routes } from 'src/assets/const/routes';

// export const routes: Routes = [
//   {
//     path: 'home',
//     component: HomePageComponent,
//   },
//   { path: 'user', component: UserPageComponent },
//   { path: 'auth/login', component: LoginComponent },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//   },
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

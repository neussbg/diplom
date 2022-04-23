import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Routes } from 'src/assets/const/route.data';
import { RouteData } from 'src/assets/interfaces/navigate/route-data.interface';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnDestroy {
  /** Subject для отслеживания изменения маршрута */
  private activeRouteSub: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  /** Subject для очистки при уничтожения сервиса */
  private readonly destroy$ = new Subject<void>();

  /** Список маршрутов */
  // routeList: Array<RouteData> = Routes;
  constructor(private router: Router) {}

  /** Возвращает заголовок текущей страницы */
  // getPageTitle(): string {
  //   const activeRoute = this.routeList[this.activeRouteSub.value];
  //   return activeRoute.title || activeRoute.name;
  // }

  /** Переход по url */
  navigateTo(routeUrl: string): void {
    this.router.navigateByUrl(routeUrl);
  }

  // /**
  //  * Переход по маршруту с параметрами
  //  * @param route - маршрут
  //  * @param data - данные
  //  */
  // navigate(route: string, data: any): void {
  //   this.router.navigate([route, data]);
  // }

  /** Освобождение ресурсов */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
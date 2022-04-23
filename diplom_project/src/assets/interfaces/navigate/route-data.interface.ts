import { Route } from '@angular/router';

/** Данные для страницы */
export interface RouteData extends Route {
  /** Название меню */
  name: string;

  /** Заголовок страницы */
  title?: string;

  /** Путь до изображения */
  icon?: string;
}

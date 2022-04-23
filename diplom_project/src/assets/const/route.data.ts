import { RoutingPath } from '../enums/router.enum';
import { RouteData } from '../interfaces/navigate/route-data.interface';

/** Данные маршрутов для навигационного сервиса */
export const Routes: Array<RouteData> = [
  {
    name: '',
    title: 'Главная страница',
    icon: 'logoCond.svg',
    path: RoutingPath.mainPage,
  },
  {
    name: 'О компании',
    title: 'О компании',
    path: RoutingPath.companyPage,
  },
  {
    name: 'Услуги',
    title: 'Услуги',
    path: RoutingPath.attendance,
  },
  {
    name: 'Каталог',
    title: 'Каталог',
    path: RoutingPath.productsPage,
  },
  {
    name: 'Контакты',
    title: 'Контакты',
    path: RoutingPath.contacts,
  },
  {
    name: '',
    icon: 'basket.svg',
    path: RoutingPath.basketPage,
  },
  {
    name: '',
    icon: 'user.svg',
    path: RoutingPath.accoutPage,
  },
];

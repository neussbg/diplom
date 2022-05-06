import { RouterEnum } from '../enums/router.enum';
import { RouteData } from '../interfaces/navigate/route-data.interface';

/** Данные маршрутов для навигационного сервиса */
export const Routes: Array<RouteData> = [
  {
    name: '',
    title: 'Главная страница',
    path: RouterEnum.mainPage,
  },
  {
    name: 'О компании',
    title: 'О компании',
    path: RouterEnum.companyPage,
  },
  {
    name: 'Услуги',
    title: 'Услуги',
    path: RouterEnum.attendance,
  },
  {
    name: 'Каталог',
    title: 'Каталог',
    path: RouterEnum.productsPage,
  },
  {
    name: 'Контакты',
    title: 'Контакты',
    path: RouterEnum.contacts,
  },
  {
    name: '',
    icon: 'basket',
    path: RouterEnum.basketPage,
  },
  {
    name: '',
    icon: 'user',
    path: RouterEnum.accoutPage,
  },
];

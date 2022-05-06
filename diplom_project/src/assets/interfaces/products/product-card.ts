/** Карточка товара */
export interface ProductCard {
  /** ИД */
  id: number;

  /** Изображение */
  img?: string;

  /** Наименование */
  name: string;

  /** Новая цена */
  newPrice: number;

  /** Старая цена */
  oldPrice?: number;

  /** Описание */
  description: string;

  /** Отзывы */
  opinie?: number;
}

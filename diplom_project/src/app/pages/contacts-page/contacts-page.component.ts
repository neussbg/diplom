import { Component, OnInit } from '@angular/core';
import { mapConfig } from 'src/app/app.module';
import { GeoObjectConstructor } from 'src/assets/interfaces/map/GeoObjectConstructor';
import { PlacemarkConstructor } from 'src/assets/interfaces/map/PlacemarkConstructor';

export const AddresValue = [
  {
    title: 'Адрес',
    value: 'г. Ростов-на-Дону, пр.Ленина 1',
  },
  {
    title: 'График работы',
    value: 'Пн-Пт с 09:00 до 18:00, Сб с 10:00 до 14:00, Вс - выходной',
  },
  {
    title: 'Телефон',
    value: '89381221913',
  },
  {
    title: 'Эл почта',
    value: 'asmeng@mail.ru',
  },
];
@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit {
  constructor() {}

  geoObject?: GeoObjectConstructor;

  addressValue = AddresValue;

  placementMarks: PlacemarkConstructor[] = [];

  ngOnInit(): void {
    this.geoObject = {
      feature: {
        // The geometry description.
        geometry: {
          type: 'Point',
          coordinates: [47.249715, 39.620330],
        },
        // Properties.
        properties: {
          // The placemark content.
          balloonContent: '<strong>red</strong> color',
          hintContent: 'Come on, drag already!',
        },
      },
      options: {
        /**
         * Options.
         * The placemark's icon will stretch to fit its contents.
         */
        preset: 'islands#blackStretchyIcon',
        // The placemark can be dragged.
        draggable: true,
      },
    };

    this.placementMarks = [
      {
        geometry: [47.249715, 39.620330],
        properties: {
          balloonContent:
            '<div class="description-cotext">Компания по продажи кондиционеров</div>',
          iconCaption: 'ООО «АСМ ИНЖИНИРИНГ»',
        },
        options: {
          preset: 'islands#icon',
          iconColor: '#317aff',
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'assets/img/contacts/geoObject.svg',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
        },
      },
    ];
  }
}

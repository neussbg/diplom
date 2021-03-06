import {
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Swiper,
  SwiperOptions,
  Autoplay,
} from 'swiper';
import { EventsParams } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Mousewheel, Keyboard]);

// export interface SlideValues {
//   name: string;
//   price: number;
// }

export interface Dictionary<T> {
  [Key: string]: T;
}

export enum SliderIndex {
  clear,
  mounting,
  refueling,
}
export const DictionarySliderValues: Dictionary<string> = {
  [SliderIndex.clear]: 'Чистка сплит систем',
  [SliderIndex.mounting]: 'Монтаж сплит систем',
  [SliderIndex.refueling]: 'Заправка сплит систем',
};

export const SLIDER_VALUE = [
  {
    name: 'Чистка настенной сплит-системы 7-18, без разбора блоков',
    price: 1500,
  },
  {
    name: 'Чистка настенной сплит-системы 24-36 , без разбора блоков',
    price: 1800,
  },
  {
    name: 'Чистка полупромышленной сплит-системы (любой тип)',
    price: 2000,
  },
];

export const SLIDER_VALUE2 = [
  {
    name: 'Чистка настенной сплит-системы 7-18, без разбора блоков',
    price: 4000,
  },
  {
    name: 'Чистка настенной сплит-системы 24-36 , без разбора блоков',
    price: 5000,
  },
  {
    name: 'Чистка полупромышленной сплит-системы (любой тип)',
    price: 6000,
  },
];

export const SLIDER_VALUE3 = [
  {
    name: 'Заправка сплит-системы, фреон R410, 100гр',
    price: 400,
  },
  {
    name: ' Заправка сплит-системы, фреон R22, 100грв',
    price: 500,
  },
  {
    name: ' Заправка сплит-системы, фреон R32, 100гр.',
    price: 600,
  },
];

@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
})
@Injectable()
export class AttendancePageComponent implements OnInit {
  constructor() {
    if (this.test === 1) {
      this.tee[0];
    } else if (this.test === 2) {
      this.tee[1];
    }
  }

  text: string = 'dsds';

  tee = DictionarySliderValues;

  sliderValues = SLIDER_VALUE;

  sliderValues2 = SLIDER_VALUE2;

  sliderValues3 = SLIDER_VALUE3;

  size: number = 3;

  config!: SwiperOptions;

  ngOnInit(): void {
    this.config = {
      centeredSlides: true,
      autoHeight: true,
      pagination: { clickable: true },
      scrollbar: { draggable: true },
      slidesPerView: 1,
      allowTouchMove: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      // navigation: true,
      loop: true,
    };
  }

  test: number = 0;
  onSlideChange(event: any) {
    this.test = event[0]?.activeIndex;
  }
}

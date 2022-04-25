import { Component, Injectable, OnInit } from '@angular/core';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

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
@Component({
  selector: 'app-attendance-page',
  templateUrl: './attendance-page.component.html',
  styleUrls: ['./attendance-page.component.scss'],
})
@Injectable()
export class AttendancePageComponent implements OnInit {
  
  constructor() {}

  sliderValues = SLIDER_VALUE;

  size: number = 3;

  config:any;

  ngOnInit(): void {
   this.config = {
      pagination: { el: '.swiper-pagination', clickable: true },
      autoHeight: true,
      allowTouchMove: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true
      },
      breakpoints: {
        1024: {
          slidesPerView: 4
        },
        500: {
          slidesPerView: 3
        },
        400: {
          slidesPerView: 2
        },
        300: {
          slidesPerView: 1
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
    };
  }

  
}

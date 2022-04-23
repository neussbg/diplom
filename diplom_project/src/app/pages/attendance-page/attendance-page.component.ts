import { Component, Injectable, OnInit } from '@angular/core';
import Swiper, { Navigation, Pagination } from 'swiper';

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

  ngOnInit(): void {
    // const swiper = new Swiper('.swiper', {
    //   speed: 400,
    //   spaceBetween: 100,

    // });

    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // // If we need pagination
      // pagination: {
      //   el: '.swiper-pagination',
      // },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      modules: [Navigation, Pagination],
    });
  }
}

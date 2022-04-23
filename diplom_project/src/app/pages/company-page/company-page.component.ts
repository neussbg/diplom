import { Component, OnInit } from '@angular/core';

export const COMPANY_ITEMS = [
  {
    title: '10 лет',
    value: 'на рынке',
  },
  {
    title: '5000+',
    value: 'продаж',
  },
  {
    title: '700+',
    value: 'товаров в каталоге',
  },
  {
    title: '25+',
    value: 'брендов-производителей',
  },
];

export const COMPANY_CONDITIONERS = [
  {
    icon: 'assets/img/company/conditioners/conditioner-1.svg',
    description: 'Монтаж сплит-систем',
  },
  {
    icon: 'assets/img/company/conditioners/conditioner-2.svg',
    description: 'Чистка сплит-систем',
  },
  {
    icon: 'assets/img/company/conditioners/conditioner-3.svg',
    description: 'Заправка сплит-систем',
  },
];

export const CONDITIONERS_MARKS = [
  {
    icon: 'assets/img/company/conditioners/marks/haier.svg',
  },
  {
    icon: 'assets/img/company/conditioners/marks/lg.svg',
  },
  {
    icon: 'assets/img/company/conditioners/marks/samsung.svg',
  },
  {
    icon: 'assets/img/company/conditioners/marks/bosch.svg',
  },
];
@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
})
export class CompanyPageComponent implements OnInit {
  companyItems = COMPANY_ITEMS;

  companyConditioners = COMPANY_CONDITIONERS;

  conditionersMarks = CONDITIONERS_MARKS;

  constructor() {}

  showText() {
    console.log('!!!');
  }

  ngOnInit(): void {}
}

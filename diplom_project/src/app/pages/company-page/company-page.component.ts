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
@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss'],
})
export class CompanyPageComponent implements OnInit {
  companyItems = COMPANY_ITEMS;

  constructor() {}

  ngOnInit(): void {}
}

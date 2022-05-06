import { Component, OnInit } from '@angular/core';
import { MAIN_ITEMS } from 'src/assets/const/main-items';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  items = MAIN_ITEMS;

  constructor() {}

  ngOnInit(): void {}
  route() {
    document.location.href = 'main/#trust';
  }

}

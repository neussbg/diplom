import { Component, OnInit } from '@angular/core';
import { MAIN_ITEMS } from 'src/assets/const/main-items';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  isHovered: boolean = false;

  items = MAIN_ITEMS;

  tesst: any;


  constructor() { }

  ngOnInit(): void {

    
  }
  test():void{
    this.isHovered = !this.isHovered
  }


}

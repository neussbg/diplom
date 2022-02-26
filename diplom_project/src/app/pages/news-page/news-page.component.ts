import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }



  openBasket(){
    this.route.navigateByUrl('/basket')
  }


  openProducts(){
    this.route.navigateByUrl('/products')
  }

  openMain(){
    this.route.navigateByUrl('/main')
  }

  openCompany(){
    this.route.navigateByUrl('/company')
  }

}

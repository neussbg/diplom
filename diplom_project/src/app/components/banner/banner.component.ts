import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/pages/services/navigation.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private navService: NavigationService) {}

  ngOnInit(): void {}

  route(url: string) {
    this.navService.navigateTo(url);
  }

  isHeartActive: boolean = false;

  isAdmin: boolean = false;

  rating: number = 4;
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingPath } from 'src/assets/enums/router.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private route: Router) {}

  isMap: boolean = false;

  ngOnInit(): void {
    // let loader = new Loader({
    //   apiKey: 'AIzaSyA3iVyrOgNzMZiZaczeXDvypqyM4qjx9WQ',
    // });
    // loader.load().then(() => {
    //   const ID = document.getElementById('map') as HTMLElement;
    //   new google.maps.Map(ID, {
    //     center: { lat: 51.233334, lng: 6.78333 },
    //     zoom: 6,
    //   });
    // });
  }

  showMap(flag: boolean) {
    flag = true;
    this.isMap = !this.isMap;
    console.log(this.isMap);
  }

  showVkPage() {
    const href = 'https://vk.com/public212664335';
    window.open(href, '_blank');
  }

  showTelegramPage() {
    const href = 'https://t.me/+GKAnaNhpPFFjZDgy';
    window.open(href, '_blank');
  }

  showWhatsUpPage() {
    const href = 'https://vk.com/thebadplace';
    window.open(href, '_blank');
  }

  /** Переходит на  страницу продуктов */
  openContacts(): void {
    this.route.navigateByUrl(RoutingPath.contacts);
  }
}
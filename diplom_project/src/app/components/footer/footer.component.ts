import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterEnum } from 'src/assets/enums/router.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

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
    this.route.navigateByUrl(RouterEnum.contacts);
  }
}

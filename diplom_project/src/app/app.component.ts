import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, AfterViewInit {
  title = 'diplom_project';

  loader: any;

  isChangeOnDarkTheme: boolean = false;

  protected onDestroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    AOS.init();
    console.log(this.isChangeOnDarkTheme);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

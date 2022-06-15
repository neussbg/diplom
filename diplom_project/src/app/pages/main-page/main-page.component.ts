import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TuiPortalService } from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { MAIN_ITEMS } from 'src/assets/const/main-items';
import { logginLabels } from 'src/assets/enums/logginLabels.enum';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { NavigationService } from '../services/navigation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  items = MAIN_ITEMS;

  // @ViewChild('content', { static: true }) content?: TemplateRef<any>;

  // @ViewChild('header', { static: true }) header?: TemplateRef<any>;

  isActive: boolean = false;

  mediaWidth!: boolean;

  submitForm = new FormGroup({
    inputValue: new FormControl(null, [Validators.required, Validators.email]),
    checkbox: new FormControl(false, Validators.required),
  });

  constructor(
    private navService: NavigationService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private fb: FormBuilder,
    private productApi: ProductsService
  ) {}

  ngOnInit(): void {
    this.submitForm.valueChanges.subscribe((s) => {
      this.isActive = s.checkbox;

      const minContentStocksWidth = window.screen.width === 524

      this.mediaWidth = minContentStocksWidth

    });
  }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    const email = this.submitForm.get('inputValue')?.value;

    this.dialogService
      .open(content, {
        label: 'Спасибо за подписку на новости!',
        header,
        size,
      })
      .subscribe();
    this.productApi.sendEmail({ email: email }).subscribe((res) => {
      if (res.ok) {
        this.submitForm.reset();
      }
    });
  }

  route(url: string) {
    this.navService.navigateTo(url);
  }
}

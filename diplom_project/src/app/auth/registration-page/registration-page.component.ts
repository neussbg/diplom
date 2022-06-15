import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TuiPortalService } from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/pages/services/auth.service';
import { logginLabels } from 'src/assets/enums/logginLabels.enum';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  aSub!: Subscription;

  show: boolean = false;

  hasErrors: boolean = false;

  authForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),

    checkbox: new FormControl(false, Validators.required),
  });

  errorMessage: string = '';

  IsCloseWindow: boolean = false;

  @ViewChild('content', { static: true }) content!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('header', { static: true }) header!: TemplateRef<any>;

  @ViewChild('contentMessageRequest', { static: true })
  contentMessageRequest!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('headerMessageRequest', { static: true })
  headerMessageRequest!: TemplateRef<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService
  ) {}

  test: boolean = false;
  onSubmitRegistration(value: any) {
    this.authForm.disable();
    this.aSub = this.auth.registration(this.authForm.value).subscribe(
      () => {
        // this.auth.registration
        this.test = true;
        this.router.navigate(['/products']);
        // this.router.navigate(['/login'], {
        //   queryParams: {
        //     registered: true,
        //   },
        // });
      },
      (error) => {
        this.hasErrors = true;
        console.warn(error);
        this.errorMessage = error.error.message;
        this.authForm.enable();
      }
    );
  }

  closeForm() {
    this.IsCloseWindow = true;
    this.router.navigate(['/products']);
  }

  showPassword() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    this.onClick(this.content, this.header, 'l');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registration']) {
      } else if (params['accessDenied']) {
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  isErrorValue: boolean = false;

  showIfFormRequare() {
    setTimeout(() => {
      this.isErrorValue = true;
      // if (this.errorMessage == '') {

      if (this.isErrorValue === true) {
        this.onSubmitMessage(
          this.contentMessageRequest,
          this.headerMessageRequest,
          's'
        );
      }
      // }
      this.router.navigate(['/products']);
    }, 500);
  }
  onSubmitMessage(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: 'На ваш e-mail пришло сообщение с подтверждением почты',
        header,
        size: 's',
        closeable: true,
      })
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      });
  }

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: logginLabels.registration,
        header,
        size: 's',
        dismissible: false,
        closeable: this.IsCloseWindow,
      })
      .subscribe();
  }
}

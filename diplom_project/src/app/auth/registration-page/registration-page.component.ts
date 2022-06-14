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

  onSubmitRegistration() {
    this.authForm.disable();
    this.aSub = this.auth.registration(this.authForm.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        });
      },
      (error) => {
        this.hasErrors = true;
        console.warn(error);
        this.errorMessage = error.error.message;
        this.authForm.enable();
      }
    );
  }

  showPassword() {
    this.show = !this.show;
  }

  ngOnInit(): void {
    this.onClick(this.content, this.header, 'fullscreen');

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

  showIfFormRequare() {
    setTimeout(() => {
      if (this.errorMessage == '') {
        this.onSubmitMessage(
          this.contentMessageRequest,
          this.headerMessageRequest,
          's'
        );
      }
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
      .subscribe();
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
        closeable: true,
        dismissible: false,
      })
      .subscribe();
  }
}

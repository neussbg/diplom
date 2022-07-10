import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clamp, TuiPortalService } from '@taiga-ui/cdk';
import {
  TuiDialogContext,
  TuiDialogService,
  TuiDialogSize,
} from '@taiga-ui/core';
import { TaskService } from '../pages/services/task.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { logginLabels } from 'src/assets/enums/logginLabels.enum';
import { AuthService, User } from '../pages/services/auth.service';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../pages/services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  user!: User;

  @ViewChild('content', { static: true }) content!: PolymorpheusContent<
    TuiDialogContext<void, undefined>
  >;

  @ViewChild('header', { static: true }) header!: TemplateRef<any>;

  @ViewChild('close', { static: true }) close!: any;

  ngOnInit(): void {
    this.getUser();
    this.onClick(this.content, this.header, 'l');

    console.log(localStorage.getItem('auth-role'));

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registration']) {
      } else if (params['accessDenied']) {
      }
    });
    // this.auth.getAuthProfile().subscribe((data) => {
    //   console.log(data);
    // });
  }

  getUser() {
    this.userServ.getById(this.auth.currentUser).subscribe((data) => {
      this.user = data;
    });
  }
  value = '';
  open = false;

  filters = false;

  isLoggedIn: boolean = false;

  aSub!: Subscription;

  show: boolean = false;

  scale = 1;

  errorMessage: string = '';

  authForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.minLength(8),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    // checkbox: new FormControl(false, Validators.required),
  });
  constructor(
    private auth: AuthService,
    private apiBack: TaskService,
    private userServ: UserService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService,
    private backApi: AuthService
  ) {}

  registrationUser: any = {};

  loginUser: any = {};

  isErrorValue: boolean = false;
  // authForm!: FormGroup;

  // onRegistrationUser(user: any): any {
  //   this.auth.registration(user).subscribe((data) => {
  //     localStorage.setItem('auth', data);
  //   });
  //   // console.log(this.registrationUser);
  // }

  onLoginUser(user: any) {
    this.auth.loginUser(user).subscribe((data: any) => {
      console.log(data, 'data');
      localStorage.setItem('auth', data.accessToken);
      localStorage.setItem('auth-login', data.user.email);
      localStorage.setItem('auth-role', data.user.role);
    });
  }

  onSumbit(value?: any) {
    setTimeout(() => {
      this.authForm.disable();
      this.aSub = this.auth.loginUser(this.authForm.value).subscribe(
        () => {
          this.isErrorValue = true;
          this.isWindowDismissible = true;
          this.auth.loginUser;
          localStorage.setItem('auth-login', this.authForm.get('email')?.value);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.warn(error, 'test');
          this.errorMessage = error.error.message;
          this.authForm.enable();
          // this.isErrorValue = true;
        }
      );
    }, 200);
  }

  closeForm() {
    this.IsCloseWindow = true;
    this.router.navigate(['/products']);
  }
  // onSubmitRegistration() {
  //   this.authForm.disabled;
  //   this.auth.registration(this.authForm.value).subscribe(
  //     () => {
  //       this.router.navigate(['/']);
  //     },
  //     (error) => {
  //       console.warn(error);
  //       this.authForm.enable();
  //     }
  //   );
  // }

  showPassword() {
    this.show = !this.show;
  }

  // get width(): string {
  //   return `calc((100% + 4rem) * ${1 / this.scale})`;
  // }
  //
  // onElastic(value: any): void {
  //   this.scale = clamp(value, 0.5, 1);
  // }

  onFilterClick(): void {
    this.filters = true;
    this.dialogService.open('Dialog with filters').subscribe({
      complete: () => {
        this.filters = false;
        this.isLoggedIn = true;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  // onRegistration() {
  //   this.backApi.registration(this.registrationUser).subscribe(
  //     (res) => {
  //       console.log(res);
  //       localStorage.setItem('token', res.a);
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  // onLogin() {
  //   this.backApi.login(this.loginUser).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }

  // showDialog() {
  //   this.open = true;
  // }

  // showDialog(
  //   content: PolymorpheusContent<TuiDialogContext>,
  //   button: TemplateRef<Record<string, unknown>>
  // ): void {
  //   const templateRef = this.portalService.addTemplate(button);

  //   this.dialogService.open(content).subscribe({
  //     complete: () => {
  //       this.portalService.removeTemplate(templateRef);
  //     },
  //   });
  // }

  logginLabels?: logginLabels;

  onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.dialogService
      .open(content, {
        label: logginLabels.login,
        header,
        size: 's',
        closeable: true,
        dismissible: this.isWindowDismissible == true ? true : false,
      })
      .subscribe();
  }
  IsCloseWindow: boolean = false;

  isWindowDismissible: boolean = false;
}

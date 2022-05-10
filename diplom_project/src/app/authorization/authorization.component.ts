import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { AuthService } from '../pages/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  ngOnInit(): void {}
  value = '';
  open = false;

  filters = false;

  isLoggedIn: boolean = false;

  aSub!: Subscription;

  scale = 1;

  autorizationForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  constructor(
    private auth: AuthService,
    private apiBack: TaskService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(TuiPortalService)
    private readonly portalService: TuiPortalService
  ) {
    const ss = this.apiBack.get();
    console.log(ss);
  }

  get transform(): string {
    return `scale(${this.scale})`;
  }

  get width(): string {
    return `calc((100% + 4rem) * ${1 / this.scale})`;
  }

  onElastic(value: any): void {
    this.scale = clamp(value, 0.5, 1);
  }

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
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  onSubmit() {
    this.autorizationForm.disable();
    (this.aSub = this.auth.login(this.autorizationForm.value).subscribe(() => {
      console.log('success');
    })),
      () => {
        console.warn('warn error');
        this.autorizationForm.enable();
      };
  }

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
        label: this.isLoggedIn ? logginLabels.registration : logginLabels.login,
        header,
        size: 's',
      })
      .subscribe();
  }
}

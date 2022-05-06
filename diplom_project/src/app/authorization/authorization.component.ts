import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clamp, TuiPortalService } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TaskService } from '../pages/services/task.service';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  value = '';
  open = false;

  filters = false;

  scale = 1;

  autorizationForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  constructor(
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
      },
    });
  }

  // showDialog() {
  //   this.open = true;
  // }

  showDialog(
    content: PolymorpheusContent<TuiDialogContext>,
    button: TemplateRef<Record<string, unknown>>
  ): void {
    const templateRef = this.portalService.addTemplate(button);

    this.dialogService.open(content).subscribe({
      complete: () => {
        this.portalService.removeTemplate(templateRef);
      },
    });
  }
}

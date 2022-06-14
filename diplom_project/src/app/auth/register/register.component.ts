import { Component, OnInit } from '@angular/core';
import { AuthizationService } from '../authization.service';
import { SignupInfo } from '../signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo!: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authServ: AuthizationService) {}

  onSubmit() {
    console.log(this.form);
    this.signupInfo = new SignupInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );

    this.authServ.sighUp(this.signupInfo).subscribe(
      (data) => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  ngOnInit(): void {}
}

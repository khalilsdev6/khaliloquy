import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public isSubmittingForm: Boolean = false;
  public isSubmittingFormSuccess: Boolean = false;
  public isSubmittingFormFailure: Boolean = false;
  public message: String = 'Welcome back!';

  @ViewChild('loginForm') loginFormRef: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log(this.loginFormRef, 'this is the login form ref');
  }

  onSubmit(): void {
    console.log('this is the submit');
  }

}

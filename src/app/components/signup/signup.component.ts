import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../shared/user';
import { AccountService } from '../../shared/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserInfoService } from '../../core/user-info.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  // This is how we access template variables.
  // We get access to the template variable 'signupForm'
  // as an ElementRef through using the ViewChild decorator.
  // If we wanted to access the native element, we could do
  // this.signupFormRef.nativeElement.

  @ViewChild('signupForm') signupFormRef: ElementRef;

  public user: User = new User();

  public message: String = `It’s literally
    just a really simple chat app for me
    to play with Angular6 :)`;

  constructor(
    private accountService: AccountService,
    private userInfoService: UserInfoService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.signupFormRef, 'this is the signup form');
    console.log(this.accountService);
  }

  /*
   * onSubmit
   * @function that submits the signup form, setting the submit
   * state of the form.
   */

  async onSubmit (): Promise<any> {
    try {
      this.spinner.show();
      const response = await this.accountService.createAccount(this.user);
      console.log(response);
      this.userInfoService.setUserInfo(this.user);
      this.spinner.hide();
      this.router.navigate(['/lobby']);
    } catch (err) {
      console.log(err);
      this.spinner.hide();
    }
  }
}

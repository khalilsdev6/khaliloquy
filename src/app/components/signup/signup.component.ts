import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../shared/user';
import { AccountService } from '../../shared/services/account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

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
  public isSubmittingForm: Boolean = false;
  public isSubmittingFormSuccess: Boolean = false;
  public isSubmittingFormFailure: Boolean = false;

  public message: String = `It’s literally
    just a really simple chat app for me
    to play with Angular6 :)`;

  constructor(
    private accountService: AccountService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.signupFormRef, 'this is the signup form');
    console.log(this.accountService);
  }

  /*
   * toggleSubmitState
   * @function that reports the current status of our submitting the
   * account to the backend.
   */

  toggleSubmitState(
    isSubmittingForm: Boolean,
    isSubmittingFormSuccess: Boolean,
    isSubmittingFormFailure: Boolean): void {
      this.isSubmittingForm = isSubmittingForm;
      this.isSubmittingFormSuccess = isSubmittingFormSuccess;
      this.isSubmittingFormFailure = isSubmittingFormFailure;
    }

  /*
   * onSubmit
   * @function that submits the signup form, setting the submit
   * state of the form.
   */

  async onSubmit (): Promise<any> {
    try {
      this.toggleSubmitState(true, false, false);
      this.spinner.show();
      const response = await this.accountService.createAccount(this.user);
      console.log(response);
      this.toggleSubmitState(false, true, false);
      this.spinner.hide();
      this.router.navigate(['/lobby']);
    } catch (err) {
      console.log(err);
      this.toggleSubmitState(false, false, true);
      this.spinner.hide();
    }
  }
}

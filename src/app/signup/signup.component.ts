import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  submitted: Boolean = false;
  message: String = `It’s literally
    just a really simple chat app for me
    to play with Angular6 :)`;

  constructor() { }

  ngOnInit() {
  }

  onSubmit (): void {
  }

}

import { Component } from '@angular/core';
import { FriendsService } from './core/friends.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'khaliloquy';

  constructor(private friendsService: FriendsService, private authService: AuthService) {
    this.friendsService = friendsService;
    this.authService = authService;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.authService.init();
  }
}

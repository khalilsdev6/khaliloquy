import { Component } from '@angular/core';
import { FriendsService } from './core/friends.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'khaliloquy';

  constructor(private friendsService: FriendsService) {
    friendsService = friendsService;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.friendsService.init('stemmlerjs');
  }
}

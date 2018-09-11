import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../shared/user';
import { UserInfoService } from '../../core/user-info.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public navItems: Object [] = [{
    name: 'Lobby',
    route: '/lobby'
  }, {
    name: 'Friends',
    route: '/friends'
  }];

  public user: User;
  private userInfoSubscription: Subscription;
  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoSubscription = this.userInfoService.getUserInfo().subscribe(
      user => {
        this.user = user;
        console.log('<NavigationComponent/>', this);
      },
      err => {
        console.log("Couldn't get user", err);
      }
    );
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

}

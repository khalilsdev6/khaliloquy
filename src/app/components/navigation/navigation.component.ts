import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  public navItems: Object [] = [{
    name: 'Lobby',
    route: '/lobby'
  }, {
    name: 'Friends',
    route: '/friends'
  }];

  public user: User = new User('stemmlerjs');

  constructor() { }

  ngOnInit() {
  }

}

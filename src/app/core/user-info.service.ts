import { Injectable } from '@angular/core';
import { UserInfo } from '../shared/user-info';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../shared/user';
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * @class UserInfoService
 * @desc The UserInfoService class is a service responsible for being
 * the single source of truth for this user's current info.
 * It can be subscribed to and when it's updated, it updates all
 * subscribers through the use of it's private userSubject subject.
 */

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userSubject: BehaviorSubject<User>;
  private userSubscription: Subscription;

  constructor(private db: AngularFireDatabase) {
    this.db = db;
    this.userSubject = new BehaviorSubject<User>(new User());
  }

  /**
   * init
   * @function that initializes the user info service after we know this user's
   * username.
   * @param {String} username
   * @return void
   */

  init (username: string) {
    if (!this.userSubscription) {
      this.userSubscription = this.db.list(`users/${username}`)
        .valueChanges()
        .subscribe(
          (data: any) => {
            this.userSubject.next(new User(data.username, '', data.profilePictureUrl));
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  /**
   * setUserInfo
   *
   * @function that sets the user's info and updates all
   * subscribers subscribing to the subject.
   */

  setUserInfo (newUserInfo: User): void {
    this.userSubject.next(newUserInfo);
  }

  /**
   * getUserInfo
   *
   * @function that returns an observable to subscribe to the
   * user's changed state.
   * @return {Observable<User>}
   */

  getUserInfo (): Observable<User> {
    return this.userSubject;
  }

}

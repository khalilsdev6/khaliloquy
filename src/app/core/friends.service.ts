import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscribable, Subscription, ReplaySubject } from 'rxjs';
import { Friend } from '../shared/friend';
import { Conversation } from '../shared/conversation';
import { ConversationAPIResponse } from '../shared/conversation-api-response';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _baseUrl = 'http://localhost:3000/api';
  private friendsList = new BehaviorSubject([]);
  private friendsListSubscription: Subscription = null;
  private friendsSearch = new ReplaySubject<Friend>(null);

  constructor (private http: HttpClient, private db: AngularFireDatabase) {
    this.db = db;
  }

  /**
   * init
   * @function that initializes the friendslist by
   * creating a subscription to the firebase friends/username key.
   * @param {String} this current user's username.
   */

  init (username: String) {
    if (!this.friendsListSubscription) {
      this.friendsListSubscription = this.db.list(`friends/${username}`)
        .valueChanges()
        .subscribe(
          (friends: Friend[]) => {
            friends = friends.map(friend =>
              new Friend(
                friend.username,
                friend.lastMessage,
                friend.profilePictureUrl,
                friend.isOnline
              )
            );
            this.friendsList.next(friends);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  /**
   * searchForFriendByUsername
   * @function that allows us to search for friends by username
   * and will update the friendsSearch subject for anyone
   * subscribed to it.
   * @param {String} username of friend
   */

  searchForFriendByUsername (username: string): void {
    this.db.database.ref('users')
      .orderByChild('username')
      .equalTo(username)
      .on('child_added', (res) => {
        if (res.key) {
          const json: any = res.toJSON();
          const friend = new Friend(json.username, json.lastMessage, json.profilePictureUrl, json.isOnline);
          this.friendsSearch.next(friend);
        } else {
          this.friendsSearch.next(null);
        }
    });
  }

  /**
   * getFriends
   * @function that returns the friendsList behavioursubject as
   * an observable to be subscribed to. When changes occur on our
   * friendslist, they will be emitted through our friendsList
   * subject.
   * @return Observable<Friend []>
   */

  public getFriends(): Observable<Friend[]> {
    return this.friendsList;
  }

  /**
   * getFriendsSearchResults
   * @function that returns the friendsSearch replaysubject as
   * an observable to be subscribed to. When changes occur on our
   * friendsSearch, they will be emitted through our friendsSearch
   * subject.
   * @return Observable<Friend []>
   */

  public getFriendsSearchResults (): Observable<Friend> {
    return this.friendsSearch;
  }
}

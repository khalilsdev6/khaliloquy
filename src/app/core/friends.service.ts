import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '../shared/friend';
import { Conversation } from '../shared/conversation';
import { ConversationAPIResponse } from '../shared/conversation-api-response';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private _baseUrl = 'http://localhost:3000/api';
  constructor (private http: HttpClient) {
  }

  /*
   * getFriends
   * @function that returns all friends from the API.
   */

  public getFriends (): Observable<Friend[]> {
    return Observable.create((observer) => {
      return this.http.get(this._baseUrl + '/friends').subscribe(
        (friends: Friend[]) => {
          friends = friends.map(
            (friend) => new Friend(friend.username, friend.messages, friend.profilePictureUrl, friend.isOnline)
          );
          observer.next(friends);
          observer.complete();
        },
        err => {
          console.log(err);
          Observable.throw(err);
        }
      );
    });
  }

  public getConversation (friend: Friend): Observable<Conversation> {
    return Observable.create((observer) => {
      return this.http.get(this._baseUrl + `/friends/${friend.username}`).subscribe(
        (convoAPIRes: ConversationAPIResponse) => {
          const conversation = Conversation.createConversationFromConversationResponse(convoAPIRes);
          observer.next(conversation);
          observer.complete();
        },
        err => {
          console.log(err);
          Observable.throw(err);
        }
      );
    });
  }
}

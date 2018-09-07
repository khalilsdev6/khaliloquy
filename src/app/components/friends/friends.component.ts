import { Component, OnInit, OnDestroy } from '@angular/core';
import { FriendsService } from '../../core/friends.service';
import { Friend } from '../../shared/friend';
import { Conversation } from '../../shared/conversation';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../../shared/message';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {

  public friends: Friend [];
  subscription: Subscription;
  public searchText: string;
  public currentConversation: Conversation;

  // We get access to all of our services through dependency injection.
  // FriendsService is a module that is imported into a root module
  // through the core module. We still need to import it via reference
  // but it will be accessible to our component through DI.
  constructor(private friendsService: FriendsService) { }

  ngOnInit() {
    this.getFriends();
  }

  clearSearchText () {
    this.searchText = "";
  }

  onMessageSent (text: string) {
    const message = new Message(text, 'stemmlerjs');
    this.currentConversation.messages.push(message);
    // also send request to the backend.
  }

  /*
   * changeConversation
   * @function that changes the current conversation in the conversation
   * panel.
   * @param {Friend} the friend to open a conversation with.
   */

  changeConversation (friend: Friend) {
    this.friendsService.getConversation(friend).subscribe(
      conversation => {
        this.currentConversation = conversation;
      },
      err => console.log(err),
      () => {
        console.log('Done loading conversation');
        console.log(this);
      }
    );
  }

  getFriends () {
    this.friendsService.getFriends().subscribe(
      friends => {
        this.friends = friends;
        if (this.friends.length !== 0) {
          this.changeConversation(this.friends[0]);
        }
      },
      err => console.log(err),
      () => {
        console.log('done loading friends');
        console.log(this);
      }
    );
  }
}

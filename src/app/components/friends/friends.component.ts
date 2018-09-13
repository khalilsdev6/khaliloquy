import { Component, OnInit, OnDestroy, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { FriendsService } from '../../core/friends.service';
import { Friend } from '../../shared/friend';
import { Conversation } from '../../shared/conversation';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';
import { Message } from '../../shared/message';
import { ConversationService } from '../../core/conversation.service';
import { fromEvent } from 'rxjs';

class Time {
  getCurrentTime() {
    return Date.now();
  }
}

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {

  public friends: Friend [];
  private friendsSubscription: Subscription;
  public currentConversation: Conversation;
  private conversationSubscription: Subscription;
  private newFriendsSearchSubscription: Subscription;
  public searchText: string;

  @ViewChild('friendsearch') friendSearchInputElement: ElementRef;

  // We get access to all of our services through dependency injection.
  // FriendsService is a module that is imported into a root module
  // through the core module. We still need to import it via reference
  // but it will be accessible to our component through DI.
  constructor(
    private friendsService: FriendsService,
    private conversationService: ConversationService
  ) { }

  /**
   * ngOnInit
   * @desc When this Container component loads, we're going to set
   * up all of the subscriptions for data that we need to watch for
   * components below us (friends, conversation messages).
   */

  ngOnInit() {
    // Setup friends subscription
    this.friendsSubscription = this.friendsService
      .getFriends()
      .subscribe(
        (friends: Friend[]) => {
          this.friends = friends;
          if (this.friends.length !== 0) {
            this.changeConversation(this.friends[0]);
          }
        },
        err => {
          console.log(err);
        }
      );

    // Setup conversation subscription
    this.conversationSubscription = this.conversationService
      .getConversation()
      .subscribe(
        (messages: Message[]) => {
          if (this.currentConversation) {
            this.currentConversation.setMessages(messages);
          }
        },
        err => {
          console.log(err);
        }
      );

    // Setup searching for new friends subscription
    this.newFriendsSearchSubscription = this.friendsService
      .getFriendsSearchResults()
      .subscribe(
        this.onFoundFriendFromSearch.bind(this),
        this.onError.bind(this)
      );

    // Handle events coming in from the search input element. Dispatch
    // queries to Firebase after 300 milliseconds.
    fromEvent(this.friendSearchInputElement.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        pluck('target', 'value')
      )
      .subscribe(
        this.onFireSearchForFriend.bind(this),
        this.onError.bind(this)
      );
  }

  clearSearchText () {
    this.searchText = "";
  }

  onMessageSent (text: string) {
    const message = new Message(text, 'stemmlerjs');
    this.currentConversation.messages.push(message);
    // also send request to the backend.
    this.conversationService.sendMessage('stemmlerjs', text);
  }

  /**
   * onFoundFriendFromSearch
   * @function dispatched after we've returned a friend from the user
   * search. We display the friend only if they're not currently
   * in our friends list AND they're not us.
   */

  onFoundFriendFromSearch(friend: Friend) {
    console.log('found a friend!!!', friend);
  }

  onFireSearchForFriend (term: string) {
    this.friendsService.searchForFriendByUsername(term);
  }

  /*
   * changeConversation
   * @function that changes the current conversation in the conversation
   * panel.
   * @param {Friend} the friend to open a conversation with.
   */

  changeConversation (friend: Friend) {
    // Set the new conversation
    this.currentConversation = new Conversation(friend, []);
    // Notify firebase to retrieve the rest of the conversation details
    // (the messages)
    this.conversationService.changeConversation('stemmlerjs', friend.username);
  }

  onError (error) {
    console.log(error);
  }
}

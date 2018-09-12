import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FriendsService } from '../../core/friends.service';
import { Friend } from '../../shared/friend';
import { Conversation } from '../../shared/conversation';
import { Observable, Subscription } from 'rxjs';
import { Message } from '../../shared/message';
import { ConversationService } from '../../core/conversation.service';

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
  public searchText: string;

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
}

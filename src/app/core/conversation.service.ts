import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../shared/message';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private messages = new BehaviorSubject([]);
  private messagesSubscription: Subscription = null;
  private currentConversationKey = "";

  constructor(private db: AngularFireDatabase) {
    this.db = db;
  }

  public sendMessage (from: string, text: string) {
    const conversationKey = this._getConversationKey();
    const timestamp = this._createTimestamp();
    const conversationRef = this.db.object(`conversations/${conversationKey}/${timestamp}`);
    conversationRef.set({ from: from, text: text });
  }

  /**
   * init
   * @function that initializes the conversation by creating a
   * subscription to the firebase key (conversations/{user}-${user})
   */

  public changeConversation (myUsername: string, friendUsername: string) {
    const conversationKey = this._generateConversationKey(myUsername, friendUsername);
    this._setConversationKey(conversationKey);

    // Clear subscription when we switch to a new conversation
    // every time.
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    this.messagesSubscription = this.db
      .list(`conversations/${conversationKey}`)
      .valueChanges()
      .subscribe(
        (messages: any []) => {
          messages = messages
            .map(message => new Message(
              message.text, message.from
            )
            );
          this.messages.next(messages);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * getConversation
   * @function that returns the messages for this conversation.
   * @return Observable<Message[]>
   */

  public getConversation (): Observable<Message []> {
    return this.messages;
  }

  private _createTimestamp() {
    const d = new Date();
    return d.getTime();
  }

  private _generateConversationKey(myUsername: string, friendUsername: string) {
    let firstKey;
    let secondKey;

    if (myUsername < friendUsername) {
      firstKey = myUsername;
      secondKey = friendUsername;
    } else {
      firstKey = friendUsername;
      secondKey = myUsername;
    }

    return `${firstKey}-${secondKey}`;
  }

  private _setConversationKey(conversationKey: string) {
    this.currentConversationKey = conversationKey;
  }

  private _getConversationKey(): string {
    return this.currentConversationKey;
  }
}

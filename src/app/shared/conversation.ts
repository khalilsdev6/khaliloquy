
import { Friend } from './friend';
import { Message } from './message';

export class Conversation {
  public messages: Message [];
  public friend: Friend;

  /*
   * I'm not entirely sure if this is a good pattern or not.
   * It feels kind of Factory-y, but we add an additional layer
   * so that we can process what comes back in the API call into an
   * instance of the Conversation class.
   *
   * I'm thinking it's a good idea to separate these two because a
   * ConversationAPIResponse might not be in the same JSON format that
   * we expect for a Conversation.
   */

  static createConversationFromConversationResponse (conversationResponse) {
    const { friend, messages } = conversationResponse;
    return new this(friend, messages );
  }

  constructor (friend: Friend, messages: Message []) {
    this.friend = new Friend(friend.username, friend.messages, friend.profilePictureUrl, friend.isOnline);
    if (Array.isArray(messages)) {
      this.messages = messages.map((message) => new Message(message.text, message.username));
    } else {
      this.messages = [];
    }
  }

  getMessages (): Message [] {
    return this.messages;
  }

  getFriend (): Friend {
    return this.friend;
  }

  setMessages (messages: Message[]): void {
    this.messages = messages;
  }
}

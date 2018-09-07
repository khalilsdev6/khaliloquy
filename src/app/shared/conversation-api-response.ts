
import { Friend } from './friend';
import { Message } from './message';

/*
 * @class ConversationAPIResponse.
 * @desc The purpose behind this class is to model
 * the response that comes back from the API into a class so
 * that we may eventually marshall it's members into a
 * Conversation instance.
 */

export class ConversationAPIResponse {
  public friend: Friend;
  public messages: Message [];

  constructor (friend, messages) {
    this.friend = friend;
    this.messages = messages;
  }
}

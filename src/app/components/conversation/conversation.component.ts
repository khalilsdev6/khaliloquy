import { Component, OnInit, Input } from '@angular/core';
import { Conversation } from '../../shared/conversation';
import { Message } from '../../shared/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {

  private myUsername = 'stemmlerjs';

  @Input('conversation') conversation: Conversation;
  constructor() { }

  ngOnInit() {
  }

  isMessageMine (messageObj): boolean {
    const message = new Message(messageObj.text, messageObj.username);
    return message.isMessageFromMe(this.myUsername);
  }

  getMessagePicture (messageObj): Object {
    const message = new Message(messageObj.text, messageObj.username);
    if (message.isMessageFromMe(this.myUsername)) {
      return {
        'backgroundImage': 'url(' + "https://khalilstemmler.com/static/me.9d170f1d.jpg" + ')',
        'color': 'blue'
      };
    } else {
      return {
        'backgroundImage': 'url(' + this.conversation.friend.profilePictureUrl + ')',
        'color': 'blue'
      };
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { Conversation } from '../../shared/conversation';
import { Message } from '../../shared/message';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit, AfterViewChecked {

  private myUsername = 'stemmlerjs';

  @Input('conversation') conversation: Conversation;
  @ViewChild('chatbar') chatbarRef: ElementRef;
  @Output('sentMessage') sentMessage = new EventEmitter();
  @ViewChild('chatMessages') chatMessagesRef: ElementRef;
  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked () {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesRef.nativeElement.scrollTop = this.chatMessagesRef.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  sendMessage () {
    const message = this.chatbarRef.nativeElement.value;
    this.sentMessage.emit(message);
    this.chatbarRef.nativeElement.value = "";
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

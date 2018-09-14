import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { Conversation } from '../../shared/conversation';
import { Message } from '../../shared/message';
import { ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConversationService } from '../../core/conversation.service';
import { UserInfoService } from '../../core/user-info.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit, AfterViewChecked {

  private myUsername = "";

  @Input('conversation') conversation: Conversation;
  @ViewChild('chatbar') chatbarRef: ElementRef;
  @Output('sentMessage') sentMessage = new EventEmitter();
  @ViewChild('chatMessages') chatMessagesRef: ElementRef;

  constructor(private userInfo: UserInfoService) { }

  ngOnInit() {
    this.scrollToBottom();
    this.userInfo.getUserInfo().subscribe(
      (userInfoData) => {
        this.myUsername = userInfoData.username;
      });
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
}

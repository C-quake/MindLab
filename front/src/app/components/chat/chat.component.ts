import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  message: any;
  messages: string[] = [];
  username: string = '';
  usernameIn: any;
  usernameValidatation: boolean = false;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.message != '' && this.username != '') {
      this.chatService.sendMessage(`${this.username} : ${this.message}`);
      this.message = '';
    } else {
      this.validatorAlert();
    }
  }
  validatorAlert() {
    this.usernameValidatation = true;
  }

  Logout() {
    localStorage.clear();
  }

  getUsername(username: string = '') {
    if (username != '') this.username = username;
  }

  ngOnInit() {
    console.log('asdfa');

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }
  Logout() {
    localStorage.clear();
  }
}

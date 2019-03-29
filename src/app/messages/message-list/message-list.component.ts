import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  private subscription: Subscription;
  messages: Message[] = [];

  constructor(private messageService: MessageService,
    private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (response) => {
          this.messageService.getMessages();
        }
      );

    this.messageService.messageListChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );

      this.contactService.getContacts();
  }

  onAddMessage (message: Message){
    this.messages.push(message);
  }

}
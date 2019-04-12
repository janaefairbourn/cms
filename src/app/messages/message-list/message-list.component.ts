import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  messages: Message[] = [];

  constructor(private messageService: MessageService,
              private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.messageService.messageListChangedEvent
      .subscribe(
        (message: Message[]) => {
          this.messages = message;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddMessage (message: Message){
    this.messages.push(message);
  }

  onSelectedMessage(message: Message[]) {
    this.messageService.messageListChangedEvent.next(message);
  }

}
import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'test', 'this is a test', 'testing'),
    new Message('2', 'test2', 'this is a test2', 'testing2'),
    new Message('3', 'test3', 'this is a test3', 'testing3')
  ]

  constructor() { }

  ngOnInit() {
  }

  onAddMessage (message: Message){
    this.messages.push(message);
  }

}

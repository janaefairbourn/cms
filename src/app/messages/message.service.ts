import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  
  messages: Message[] = [];

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message{
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }
}
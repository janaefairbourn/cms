import { Message } from './message.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
// import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();
  
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages(messages: Message[]) {
    this.messages = JSON.parse(JSON.stringify(this.messages));
        const header = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put('https://fairbournj-cms.firebaseio.com/messages.json', this.messages, {headers: header})
          .subscribe(
            (messages: Message[]) => {
              this.messageListChangedEvent.next(this.messages.slice());
            }
          );
  }
  
  getMessages() {
    this.http.get('https://fairbournj-cms.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messages.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          this.messageListChangedEvent.next(this.messages.slice());
        }, (error: any) => {
          console.log('Please contact Website Admin')
        }
      ); 
  }

  getMessage(id: string): Message{
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
    }

    this.maxMessageId++;
    newMessage.id = String(this.maxMessageId);
    this.messages.push(newMessage);
    // this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages(this.messages);
  }
}
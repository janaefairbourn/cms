import { Message } from './message.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

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

  // storeMessages(messages: Message[]) {
  //   this.messages = JSON.parse(JSON.stringify(this.messages));
  //       const header = new HttpHeaders({'Content-Type': 'application/json'});
  //       return this.http.put('https://fairbournj-cms.firebaseio.com/messages.json', this.messages, {headers: header})
  //         .subscribe(
  //           (messages: Message[]) => {
  //             this.messageListChangedEvent.next(this.messages.slice());
  //           }
  //         );
  // }
  
  getMessages() {
    this.http.get<{message: string, messages: Message[]}>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          //this.messages.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
          // Revisit
          // this.maxMessageId = this.getMaxId();
          this.messageListChangedEvent.next(this.messages.slice());
        }, (error: any) => {
          console.log('Please contact Website Admin')
        }
      ); 
  }

  getMessage(id: string): Message{
    if (!this.messages) {
      return null;
    }

    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  // delete messages?

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


  addMessage(message: Message) {
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    message.id = '';

    this.http.post<{message: string, newMessage: Message}>('http://localhost:3000/messages', message, {headers: headers})
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.newMessage);
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
    // this.maxMessageId++;
    // newMessage.id = String(this.maxMessageId);
    // this.messages.push(newMessage);
    // // this.messages.push(message);
    // // this.messageChangeEvent.emit(this.messages.slice());
    // this.storeMessages(this.messages);
  }
}
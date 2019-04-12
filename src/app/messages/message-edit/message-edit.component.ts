import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '2';
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage(){
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msg: string = this.msgTextInputRef.nativeElement.value;
    const id: string ="040243";
    const newMessage = new Message( id, msgSubject, msg, this.currentSender);
    this.messageService.addMessage(newMessage);
    // this.onClear();
  }

  onClear(){
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}

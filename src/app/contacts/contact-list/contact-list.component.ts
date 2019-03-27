import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

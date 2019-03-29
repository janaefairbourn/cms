import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: "root" 
})
export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact[]>();
    // contactChangedEvent = new EventEmitter<Contact[]>();
    
    contactListChangedEvent = new Subject<Contact[]>();
    contacts: Contact[] = [];
    maxContactId: number;

    constructor(private http: HttpClient) {
        // this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
        this.getContacts();
    }

    storeContacts() {
        this.contacts = JSON.parse(JSON.stringify(this.contacts));
        const header = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put('https://fairbournj-cms.firebaseio.com/contacts.json', this.contacts, {headers: header})
          .subscribe(
            (contacts: Contact[]) => {
              this.contactListChangedEvent.next(this.contacts.slice());
            }
          );
      }
    
      getContacts() {
        this.http.get('https://fairbournj-cms.firebaseio.com/contacts.json')
          .subscribe(
            (contacts: Contact[]) => {
              this.contacts = contacts;
              this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
              this.contactListChangedEvent.next(this.contacts.slice());
            }, (error: any) => {
              console.log('Please contact Website Admin')
            }
          ); 
      }

    getContact(id: string): Contact{
       for (let contact of this.contacts) {
           if (contact.id === id) {
               return contact;
           }
       } 
       return null;
    }

    deleteContact(contact: Contact) {
        if (contact === null || contact === undefined) {
            return;
        }

        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }

        this.contacts.splice(pos,1);
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        this.storeContacts();
    }

    getMaxId(): number {
        let maxId = 0;

        for (let contact of this.contacts) {
            const currentId = parseInt(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    addContact(newContact: Contact) {
        if (newContact === undefined || newContact === null) {
            return;
        }

        this.maxContactId++
        newContact.id = String(this.maxContactId);
        this.contacts.push(newContact);
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (originalContact === undefined || originalContact === null || newContact === undefined || newContact === null) {
            return;
        }

        const pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        this.storeContacts();
    }

}
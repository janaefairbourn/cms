import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { stringify } from '@angular/core/src/render3/util';

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

    // storeContacts() {
    //     this.contacts = JSON.parse(JSON.stringify(this.contacts));
    //     const header = new HttpHeaders({'Content-Type': 'application/json'});
    //     return this.http.put('https://fairbournj-cms.firebaseio.com/contacts.json', this.contacts, {headers: header})
    //       .subscribe(
    //         (contacts: Contact[]) => {
    //           this.contactListChangedEvent.next(this.contacts.slice());
    //         }
    //       );
    //   }
    
      getContacts() {
        this.http.get<{ message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
          .subscribe(
              
            (res) => {
              this.contacts = res.contacts;
              this.contacts.sort((a, b) => (a['name'] < b['name']) ? 1 : (a['name'] > b['name']) ? -1 : 0);
              this.contactListChangedEvent.next(this.contacts.slice());
            }, (error: any) => {
              console.log('Please contact Website Admin')
            }
          ); 
          return this.contacts.slice();
      }

    getContact(id: string): Contact{
       if (!this.contacts) {
           return null;
       }
       
        for (let contact of this.contacts) {
           if (contact.id === id) {
               return contact;
           }
       } 
       return null;
    }

    deleteContact(contact: Contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }

        this.http.delete('http://localhost:3000/contacts/' + contact.id)
        .subscribe(
            (responseData) => {
                this.contacts.splice(pos, 1);
                this.contactListChangedEvent.next(this.contacts.slice());
            });

        // this.contacts.splice(pos,1);
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        // this.storeContacts();
    }

    getMaxId(): number {
        let maxId = 0;

        for (let contact of this.contacts) {
            let currentId = parseInt(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        }

        return maxId;
    }

    // const headers = new HttpHeaders ({
    //     'Content-Type' : 'application/json'
    // });

    addContact(newContact: Contact) {
        if (!newContact) {
            return;
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        newContact.id = '';

        this.http.post<{message: string, contact: Contact}>('http://localhost:3000/contacts', newContact, {headers: headers})
            .subscribe(
                (responseData) => {
                    this.contacts.push(responseData.contact);
                    this.contactListChangedEvent.next(this.contacts.slice());
                }
            );

        // this.maxContactId++
        // newContact.id = String(this.maxContactId);
        // this.contacts.push(newContact);
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        // this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.put<{message: string, contact: Contact}>('http://localhost:3000/contacts/' 
        + originalContact.id, newContact, {headers: headers})
            .subscribe(
                (responseData) => {
                    this.contacts[pos] = newContact;
                    this.contactListChangedEvent.next(this.contacts.slice());
                }
            );
        // newContact.id = originalContact.id;
        // this.contacts[pos] = newContact;
        // const contactsListClone = this.contacts.slice();
        // this.contactListChangedEvent.next(contactsListClone);
        // this.storeContacts();
    }

}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;
  invalidGroupContact = false;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(this.id);
          if (!this.originalContact) {
            this.editMode = false;
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.originalContact.group && this.originalContact.group.length > 0) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    console.log(this.groupContacts);
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) 
      return;
    
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
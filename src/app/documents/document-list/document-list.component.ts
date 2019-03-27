import { Component, OnInit, Injectable } from '@angular/core';
import { Document} from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  private subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
   }

  ngOnInit() {
    this.subscription = this.documentService.documentChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      )
  }

}
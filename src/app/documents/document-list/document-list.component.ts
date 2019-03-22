import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document} from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('CIT 260', 'Object Oriented Programming', 'This is a test1', 'test.com'),
    new Document('CIT 366', 'Full Web Stack Development', 'This is a test2', 'test.com'),
    new Document('CIT 425', 'Data Warhousing', 'This is a test3', 'test.com'),
    new Document('Cit 460', 'Enterprise Development', 'This is a test4', 'test.com')
  ]

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument (document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
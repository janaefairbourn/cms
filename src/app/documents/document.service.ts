import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: "root"
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document[]>();
  // documentChangedEvent = new EventEmitter<Document[]>(); 

  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;


  constructor(private http: HttpClient) {
   // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  // storeDocuments() {
  //   this.documents = JSON.parse(JSON.stringify(this.documents));
  //   const header = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.put('https://fairbournj-cms.firebaseio.com/documents.json', this.documents, {headers: header})
  //     .subscribe(
  //       (documents: Document[]) => {
  //         this.documentListChangedEvent.next(this.documents.slice());
  //       }
  //     );
  // }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (res) => {
          this.documents = res.documents;
          //this.documents.sort((a, b) => (a.name < b.name) ? 1: (a.name > b.name) ? -1 : 0);
          this.documentListChangedEvent.next(this.documents.slice());
        }, (error: any) => {
          console.log('Please contact Website Admin')
        }
      ); 
  }

  getDocument(id: string): Document {
    for (const document of this.documents){
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/'
    + document.id)
    .subscribe(
      (responseData) => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
      });

    // const pos = this.documents.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }

    // this.documents.splice(pos, 1);
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      const currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document){
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newDocument.id = '';
    //const strDocument = JSON.stringify(newDocument);

    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents', newDocument, {headers: headers})
    // .map(
    //   (response: Response) => {
    //     return response.json().obj;
    //   })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.documentListChangedEvent.next(this.documents.slice());
        });

  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders ({
      'Content-Type' : 'application/json'
    });

    this.http.put<{ message: string, document: Document }>('http://localhost:3000/documents/' 
    + originalDocument.id, newDocument, {headers: headers })
    .subscribe(
      (responseData) => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      });

    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    // this.storeDocuments();
  }

}
import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = params.id;
          if (!id) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(id);
          if (!this.originalDocument){
            this.editMode = false;
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document('', value.name, value.description, value.documentUrl, null);
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}

// Start on Page 17.  Figure out why URL doesn't carry over in edit.
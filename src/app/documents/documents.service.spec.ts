import { TestBed } from '@angular/core/testing';

import { DocumentService } from './document.service';

describe('DocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentService = TestBed.get(DocumentService);
    expect(service).toBeTruthy();
  });
});

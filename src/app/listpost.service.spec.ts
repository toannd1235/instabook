import { TestBed, inject } from '@angular/core/testing';

import { ListpostService } from './listpost.service';

describe('ListpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListpostService]
    });
  });

  it('should be created', inject([ListpostService], (service: ListpostService) => {
    expect(service).toBeTruthy();
  }));
});

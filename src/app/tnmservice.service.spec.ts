import { TestBed } from '@angular/core/testing';

import { TNMServiceService } from './tnmservice.service';

describe('TNMServiceService', () => {
  let service: TNMServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TNMServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

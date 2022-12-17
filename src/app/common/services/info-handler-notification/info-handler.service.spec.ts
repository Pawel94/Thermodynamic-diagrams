import { TestBed } from '@angular/core/testing';

import { InfoHandlerService } from './info-handler.service';

describe('InfoHandlerService', () => {
  let service: InfoHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

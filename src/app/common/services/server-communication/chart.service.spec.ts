import { TestBed } from '@angular/core/testing';

import { chartService } from './chart.service';

describe('DiagramService', () => {
  let service: chartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(chartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

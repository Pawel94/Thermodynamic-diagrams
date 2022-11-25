import { TestBed } from '@angular/core/testing';

import { ThermodataService } from './thermodata.service';

describe('ThermodataService', () => {
  let service: ThermodataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThermodataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

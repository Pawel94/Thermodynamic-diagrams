import { TestBed } from '@angular/core/testing';

import { ZoomChartService } from './zoom-chart.service';

describe('ZoomChartService', () => {
  let service: ZoomChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

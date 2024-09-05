import { TestBed } from '@angular/core/testing';

import { WaterTrackingService } from './water-tracking.service';

describe('WaterTrackingService', () => {
  let service: WaterTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

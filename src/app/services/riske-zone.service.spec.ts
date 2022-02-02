import { TestBed } from '@angular/core/testing';

import { RiskeZoneService } from './riske-zone.service';

describe('RiskeZoneService', () => {
  let service: RiskeZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskeZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

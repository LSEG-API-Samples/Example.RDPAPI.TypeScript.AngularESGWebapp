import { TestBed } from '@angular/core/testing';

import { EsgService } from './esg.service';

describe('EsgService', () => {
  let service: EsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

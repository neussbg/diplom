import { TestBed } from '@angular/core/testing';

import { InventorsService } from './inventors.service';

describe('InventorsService', () => {
  let service: InventorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { AperturaService } from './apertura.service';

describe('AperturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AperturaService]
    });
  });

  it('should be created', inject([AperturaService], (service: AperturaService) => {
    expect(service).toBeTruthy();
  }));
});

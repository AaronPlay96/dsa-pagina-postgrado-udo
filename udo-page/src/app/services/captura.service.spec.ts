import { TestBed, inject } from '@angular/core/testing';

import { CapturaService } from './captura.service';

describe('CapturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapturaService]
    });
  });

  it('should be created', inject([CapturaService], (service: CapturaService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CrearpostgradoService } from './crearpostgrado.service';

describe('CrearpostgradoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearpostgradoService]
    });
  });

  it('should be created', inject([CrearpostgradoService], (service: CrearpostgradoService) => {
    expect(service).toBeTruthy();
  }));
});

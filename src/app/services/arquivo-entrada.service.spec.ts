import { TestBed, inject } from '@angular/core/testing';

import { ArquivoEntradaService } from './arquivo-entrada.service';

describe('ArquivoEntradaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArquivoEntradaService]
    });
  });

  it('should be created', inject([ArquivoEntradaService], (service: ArquivoEntradaService) => {
    expect(service).toBeTruthy();
  }));
});

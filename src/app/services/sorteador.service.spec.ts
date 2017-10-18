import { TestBed, inject } from '@angular/core/testing';

import { SorteadorService } from './sorteador.service';

describe('SorteadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SorteadorService]
    });
  });

  it('should be created', inject([SorteadorService], (service: SorteadorService) => {
    expect(service).toBeTruthy();
  }));
});

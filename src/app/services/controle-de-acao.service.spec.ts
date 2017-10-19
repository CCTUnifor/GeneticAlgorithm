import { TestBed, inject } from '@angular/core/testing';

import { ControleDeAcaoService } from './controle-de-acao.service';

describe('ControleDeAcaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControleDeAcaoService]
    });
  });

  it('should be created', inject([ControleDeAcaoService], (service: ControleDeAcaoService) => {
    expect(service).toBeTruthy();
  }));
});

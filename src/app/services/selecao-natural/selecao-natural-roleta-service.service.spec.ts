import { TestBed, inject } from '@angular/core/testing';

import { SelecaoNaturalRoletaServiceService } from './selecao-natural-roleta-service.service';

describe('SelecaoNaturalRoletaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelecaoNaturalRoletaServiceService]
    });
  });

  it('should be created', inject([SelecaoNaturalRoletaServiceService], (service: SelecaoNaturalRoletaServiceService) => {
    expect(service).toBeTruthy();
  }));
});

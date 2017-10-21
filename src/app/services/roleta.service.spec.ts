import { TestBed, inject } from '@angular/core/testing';

import { RoletaService } from './roleta.service';

describe('RoletaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoletaService]
    });
  });

  it('should be created', inject([RoletaService], (service: RoletaService) => {
    expect(service).toBeTruthy();
  }));
});

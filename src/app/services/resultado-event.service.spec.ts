import { TestBed, inject } from '@angular/core/testing';

import { ResultadoEventService } from './resultado-event.service';

describe('ResultadoEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultadoEventService]
    });
  });

  it('should be created', inject([ResultadoEventService], (service: ResultadoEventService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { IOManagerService } from './gerenciador-io.service';

describe('GerenciadorIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IOManagerService]
    });
  });

  it('should be created', inject([IOManagerService], (service: IOManagerService) => {
    expect(service).toBeTruthy();
  }));
});

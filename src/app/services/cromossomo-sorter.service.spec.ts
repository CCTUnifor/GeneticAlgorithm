import { TestBed, inject } from '@angular/core/testing';

import { CromossomoSorterService } from './cromossomo-sorter.service';

describe('CromossomoSorterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CromossomoSorterService]
    });
  });

  it('should be created', inject([CromossomoSorterService], (service: CromossomoSorterService) => {
    expect(service).toBeTruthy();
  }));
});

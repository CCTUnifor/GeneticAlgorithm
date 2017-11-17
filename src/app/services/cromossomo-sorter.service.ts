import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';

@Injectable()
export class CromossomoSorterService {
  constructor() { }

  public ordernar(populacao: Cromossomo[]) {
    populacao.sort((a, b) => {
      if (a.fitness > b.fitness)
        return 1;
      if (a.fitness < b.fitness)
        return -1;
      return 0;
    })
  }
}

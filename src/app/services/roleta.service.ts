import { SorteadorService } from './sorteador.service';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';

@Injectable()
export class RoletaService {

  constructor(private _sorter: SorteadorService) { }

  public melhor(populacao: Array<Cromossomo>): Cromossomo {
    let fitnesTotal = 0;
    populacao.forEach(cromossomo => {
      fitnesTotal += cromossomo.fitness;
    });

    let partition: Cromossomo[] = [];
    let indexPartition: number = 0;

    for (var i = 0; i < populacao.length; i++) {
      let cromossomo = populacao[i];
      let quantidadeDaPartition = Math.ceil((fitnesTotal / cromossomo.fitness));
      for (var index = 0; index < quantidadeDaPartition; index++) {
        partition.push(cromossomo);
      }

    }

    this._sorter.resetArray();
    let number = this._sorter.sort(partition.length);

    return partition[number];
  }
}

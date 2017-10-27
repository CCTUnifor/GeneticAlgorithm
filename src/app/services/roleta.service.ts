import { SorteadorService } from './sorteador.service';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';

@Injectable()
export class RoletaService {

  constructor(private _sorter: SorteadorService) { }

  public melhor(populacao: Array<Cromossomo>): Cromossomo {
    let keys: KeyPair<Cromossomo>[] = [];
    let fitnesTotal = 0;
    populacao.forEach(cromossomo => {
      fitnesTotal += cromossomo.fitness;
    });

    let indexPartition: number = 0;

    for (var i = 0; i < populacao.length; i++) {
      let cromossomo = populacao[i];
      let quantidadeDaPartition = (indexPartition + (fitnesTotal / cromossomo.fitness))/100;
      keys.push(new KeyPair(indexPartition, quantidadeDaPartition, cromossomo));
      indexPartition += quantidadeDaPartition;
      // for (var index = 0; index < quantidadeDaPartition; index++) {
      //   partition.push(cromossomo);
      // }

    }

    this._sorter.resetArray();
    let number = this._sorter.sort(indexPartition, true);
    let x = keys.filter(x => x.min >= number && x.max < number).map(x => x.value)[0];

    return x;
  }
}
class KeyPair<T> {
  min: number;
  max: number;
  value: T;

  constructor(min, max, v: T) {
    this.min = min;
    this.max = max;
    this.value = v;
  }
}
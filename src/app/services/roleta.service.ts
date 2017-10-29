import { SorteadorService } from './sorteador.service';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ResultadoSelecaoNatural } from '../interfaces/selecao-natural';

@Injectable()
export class RoletaService {

  constructor(private _sorter: SorteadorService) { }

  public roll(populacao: Array<Cromossomo>, quantidade: number = 2): ResultadoSelecaoNatural {
    let keys: KeyPair<Cromossomo>[] = [];
    let fitnesTotal = this.fitnessTotal(populacao);

    for (var i = 0; i < populacao.length; i++) {
      let cromossomo = populacao[i];
      let porcentagem = (fitnesTotal / cromossomo.fitness);

      keys.push(new KeyPair(porcentagem, cromossomo));
    }

    keys = keys.sort((a, b) => {
      if (a.key > b.key)
        return 1;
      if (a.key < b.key)
        return -1;
      return 0;
    })

    let retorno = [];
    this._sorter.resetArray();
    for (var i = 0; i < quantidade; i++) {
      let number = this._sorter.sort(populacao.length);
      let x = keys[number].value;
      retorno.push(x);
    }

    return new ResultadoSelecaoNatural(retorno);
  }

  private fitnessTotal(populacao: Cromossomo[]) {
    let fitnesTotal: number = 0;
    populacao.forEach(cromossomo => {
      fitnesTotal += cromossomo.fitness;
    });
    return fitnesTotal;
  }
}
class KeyPair<T> {
  key: number;
  value: T;

  constructor(key, v: T) {
    this.key = key;
    this.value = v;
  }
}
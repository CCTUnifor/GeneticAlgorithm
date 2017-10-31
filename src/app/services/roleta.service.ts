import { element } from 'protractor';
import { SorteadorService } from './sorteador.service';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ResultadoSelecaoNatural } from '../interfaces/selecao-natural';

@Injectable()
export class RoletaService {

  constructor(private _sorter: SorteadorService) { }

  public roll(populacao: Array<Cromossomo>, quantidade: number = 2): ResultadoSelecaoNatural {
    let keys = this.gerarPorcentagem(populacao);
    this.ordernar(keys);
    this.ajustarPosicoes(keys);

    let retorno = [];
    for (var i = 0; i < quantidade; i++) {
      this._sorter.resetArray();
      let number = this._sorter.sort(1, true) + 1;
      
      let x = 0;
      for (var j = 0; j < keys.length; j++) {
        var element = keys[j];
        x += element.key;
        if (x >= number) {
          retorno.push(element.value);
          break;
        }
      }
    }

    return new ResultadoSelecaoNatural(retorno);
  }

  private ordernar(keys: KeyPair<Cromossomo>[]) {
    keys = keys.sort((a, b) => {
      if (a.key > b.key)
        return 1;
      if (a.key < b.key)
        return -1;
      return 0;
    });
  }

  private fitnessTotal(populacao: Cromossomo[]) {
    let fitnesTotal: number = 0;
    populacao.forEach(cromossomo => {
      fitnesTotal += cromossomo.fitness;
    });
    return fitnesTotal;
  }

  private gerarPorcentagem(populacao: Array<Cromossomo>) {
    let keys: KeyPair<Cromossomo>[] = [];
    let fitnesTotal = Number(this.fitnessTotal(populacao).toFixed(4));

    for (var i = 0; i < populacao.length; i++) {
      let cromossomo = populacao[i];
      let porcentagem = cromossomo.fitness / fitnesTotal;

      keys.push(new KeyPair(porcentagem, cromossomo));
    }
    return keys;
  }

  private ajustarPosicoes(keys: KeyPair<Cromossomo>[]) {
    for (var i = 0; i < keys.length / 2; i++) {
      var element = new KeyPair(keys[i].key, keys[i].value);
      let correspondente = (keys.length - i) - 1;

      keys[i].value = keys[correspondente].value;
      keys[correspondente].value = element.value;
    }
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
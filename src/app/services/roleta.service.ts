import { element } from 'protractor';
import { SorteadorService } from './sorteador.service';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ResultadoSelecaoNatural } from '../interfaces/selecao-natural';

@Injectable()
export class RoletaService {

  private keys: KeyPair<Cromossomo>[];

  constructor(private _sorter: SorteadorService) { }

  public prepararRoleta(populacao: Cromossomo[]) {
    this.keys = this.gerarPorcentagem(populacao);
    this.ordernar();
    this.ajustarPosicoes();
  }

  public roll(populacao: Array<Cromossomo>, quantidade: number = 2): ResultadoSelecaoNatural {
    if (!this.keys)
      this.prepararRoleta(populacao);

    let retorno = [];
    for (var i = 0; i < quantidade; i++) {
      this._sorter.resetArray();
      let number = this._sorter.sort(1, true) + 1;

      let x = 0;
      for (var j = 0; j < this.keys.length; j++) {
        var element = this.keys[j];
        x += element.key;
        if (x >= number) {
          retorno.push(element.value);
          break;
        }
      }
    }
    return new ResultadoSelecaoNatural(retorno);
  }

  private ordernar() {
    this.keys = this.keys.sort((a, b) => {
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

  private ajustarPosicoes() {
    for (var i = 0; i < this.keys.length / 2; i++) {
      var element = new KeyPair(this.keys[i].key, this.keys[i].value);
      let correspondente = (this.keys.length - i) - 1;

      this.keys[i].value = this.keys[correspondente].value;
      this.keys[correspondente].value = element.value;
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
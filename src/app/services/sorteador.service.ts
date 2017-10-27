import { Injectable } from '@angular/core';

@Injectable()
export class SorteadorService {
  private sorteados: number[] = [];

  public sort(range: number, isFloat: boolean = false) {
    if (this.sorteados.length == range)
      return;

    let sugestao = 0;
    if (isFloat)
      sugestao = (Math.random() * range) - 1;
    else
      sugestao = Math.ceil(Math.random() * range) - 1;

    while (this.sorteados.indexOf(sugestao) >= 0) {
      if (isFloat)
        sugestao = (Math.random() * range) - 1;
      else
        sugestao = Math.ceil(Math.random() * range) - 1;
    }

    this.sorteados.push(sugestao);
    return sugestao;
  }

  public resetArray() {
    this.sorteados = [];
  }
}

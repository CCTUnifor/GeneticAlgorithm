import { ISelecaoNatural, ResultadoSelecaoNatural } from './../../interfaces/selecao-natural';
import { Injectable } from '@angular/core';
import { Cromossomo } from '../../entities/cromossomo';
import { RoletaService } from '../roleta.service';

@Injectable()
export class SelecaoNaturalRoletaServiceService implements ISelecaoNatural {

  constructor(private _roleta: RoletaService) { }

  public gerarPais(populacao: Cromossomo[]): ResultadoSelecaoNatural[] {
    let tuplasDosFilhos: Array<ResultadoSelecaoNatural> = [];
    this._roleta.prepararRoleta(populacao);

    for (var i = 0; i < populacao.length / 2; i++) {
      let pais = this._roleta.roll(populacao);
      tuplasDosFilhos.push(pais);
    }

    return tuplasDosFilhos;
  }
}

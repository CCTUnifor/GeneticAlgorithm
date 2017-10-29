import { ISelecaoNatural, ResultadoSelecaoNatural } from './../../interfaces/selecao-natural';
import { Injectable } from '@angular/core';
import { Cromossomo } from '../../entities/cromossomo';
import { RoletaService } from '../roleta.service';

@Injectable()
export class SelecaoNaturalRoletaServiceService implements ISelecaoNatural {

  constructor(private _roleta: RoletaService) { }

  public gerarPais(populacao: Cromossomo[]): ResultadoSelecaoNatural {
    return this._roleta.roll(populacao)
  }
}

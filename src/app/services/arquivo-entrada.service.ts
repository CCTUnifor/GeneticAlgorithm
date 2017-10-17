import { IOManagerService } from './gerenciador-io.service';
import { Injectable } from '@angular/core';
import { Coordenada } from '../entities/coordenada';

@Injectable()
export class ArquivoEntradaService {
  public quantidadeDeCidades: number;
  public coordenadas: Array<Coordenada>;

  constructor(private _IOManager: IOManagerService) { }

  public async carregarArquivo(file: File) {
    let linhas: Array<String> = await this._IOManager.readFileList(file);
    this.quantidadeDeCidades = +linhas[0];
    linhas.shift();

    this.coordenadas = linhas.map((x) => new Coordenada(+x.split(" ")[0], +x.split(" ")[1]));
  }
}


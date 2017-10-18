import { IOManagerService } from './gerenciador-io.service';
import { Injectable } from '@angular/core';
import { Coordenada } from '../entities/coordenada';
import { Node } from "../entities/node";
@Injectable()
export class ArquivoEntradaService {
  public quantidadeDeCidades: number;
  public cidades: Array<Node>;

  constructor(private _IOManager: IOManagerService) { }

  public async carregarArquivo(file: File) {
    let linhas: Array<String> = await this._IOManager.readFileList(file);
    this.quantidadeDeCidades = +linhas[0];
    linhas.shift();
    let coordenadas = linhas.map((x) => new Coordenada(+x.split(" ")[0], +x.split(" ")[1]));
    this.cidades = coordenadas.map((x, i) => new Node(x, i));
    
    this.cidades[0].color = "blue";
    this.cidades[this.cidades.length - 1].color = "blue";
  }
}


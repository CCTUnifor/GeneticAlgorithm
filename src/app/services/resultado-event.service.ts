import { Observable } from 'rxjs/Observable';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ResultadoEventService {
  private resultadoEventSource = new ReplaySubject<DadosMelhorCromossomo>();
  public handleAdd: Observable<any> = this.resultadoEventSource.asObservable();
  public resultados: DadosMelhorCromossomo[] = [];

  public get melhorResultado() {
    return this.resultados.sort((a, b) => {
        if (a.cromossomo.fitness > b.cromossomo.fitness)
          return 1;
        if (a.cromossomo.fitness < b.cromossomo.fitness)
          return -1
        return 0;
      })[0];
  }
  
  public add(cromossomo: Cromossomo, geracoes: number, tempo: string, time: number, indexSolucao: number){
    let dados: DadosMelhorCromossomo = {
      cromossomo,
      geracoes,
      tempo,
      time,
      indexSolucao
    };
    this.resultados.push(dados);
    this.resultadoEventSource.next(dados);
  }
}

export class DadosMelhorCromossomo {
  public cromossomo: Cromossomo;
  public geracoes: number;
  public tempo: string;
  public time: number;
  public indexSolucao: number;
}

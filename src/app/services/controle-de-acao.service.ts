import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { EntradaDados } from '../entities/entrada-dados';

@Injectable()
export class ControleDeAcaoService {
  private controleDeAcaoSource = new ReplaySubject<any>();

  public handleStartarAplicacao: Observable<any> = this.controleDeAcaoSource.asObservable();
  public handlePausarAplicacao: Observable<any> = this.controleDeAcaoSource.asObservable();
  public handleLimparAplicacao: Observable<any> = this.controleDeAcaoSource.asObservable();
  public handleResetarAplicacao: Observable<any> = this.controleDeAcaoSource.asObservable();
  public handleProgramaAcabou: Observable<any> = this.controleDeAcaoSource.asObservable();

  public startarAplicacao(dados: EntradaDados) {
    this.controleDeAcaoSource.next(dados);
  }

  public pausarAplicacao() {
    this.controleDeAcaoSource.next(1);
  }

  public limparAplicacao() {
    this.controleDeAcaoSource.next(1);
  }

  public resetarAplicacao() {
    this.controleDeAcaoSource.next(1);
  }

  public programaAcabou() {
    this.controleDeAcaoSource.next(1);
  }
}

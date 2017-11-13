import { EntradaDados } from './../entities/entrada-dados';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ControleDeAcaoService {
  private startarAplicacaoSource = new ReplaySubject<EntradaDados>();
  private pausarAplicacaoSource = new ReplaySubject<any>();
  private limparAplicacaoSource = new ReplaySubject<any>();
  private resetarAplicacaoSource = new ReplaySubject<any>();
  private programaAcabouSource = new ReplaySubject<any>();
  private arquivoMudouSource = new ReplaySubject<File>();

  public handleStartarAplicacao: Observable<EntradaDados> = this.startarAplicacaoSource.asObservable();
  public handlePausarAplicacao: Observable<any> = this.pausarAplicacaoSource.asObservable();
  public handleLimparAplicacao: Observable<any> = this.limparAplicacaoSource.asObservable();
  public handleResetarAplicacao: Observable<any> = this.resetarAplicacaoSource.asObservable();
  public handleProgramaAcabou: Observable<any> = this.programaAcabouSource.asObservable();
  public handleArquivoMudou: Observable<File> = this.arquivoMudouSource.asObservable();

  public startarAplicacao(dados: EntradaDados) {
    this.startarAplicacaoSource.next(dados);
  }

  public pausarAplicacao() {
    this.pausarAplicacaoSource.next(1);
  }

  public limparAplicacao() {
    this.limparAplicacaoSource.next(1);
  }

  public resetarAplicacao() {
    this.resetarAplicacaoSource.next(1);
  }

  public programaAcabou() {
    this.programaAcabouSource.next(1);
  }

  public arquivoMudou(arquivo: File) {
    this.arquivoMudouSource.next(arquivo)
  }
}

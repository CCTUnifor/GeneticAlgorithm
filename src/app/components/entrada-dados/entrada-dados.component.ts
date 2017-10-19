import { ControleDeAcaoService } from './../../services/controle-de-acao.service';
import { Component, OnInit } from '@angular/core';
import { EntradaDados } from '../../entities/entrada-dados';

@Component({
  selector: 'app-entrada-dados',
  templateUrl: './entrada-dados.component.html',
  styleUrls: ['./entrada-dados.component.css']
})
export class EntradaDadosComponent {
  private dados: EntradaDados;

  constructor(private _controleAcaoService: ControleDeAcaoService) {
    this.dados = new EntradaDados();
  }

  onInputChange(event) {
    let target = event.explicitOriginalTarget || event.srcElement;
    this.dados.arquivo = target.files[0];
  }

  startar() {
    this._controleAcaoService.startarAplicacao(this.dados);
  }

  limpar() {
    this._controleAcaoService.limparAplicacao();
  }
}

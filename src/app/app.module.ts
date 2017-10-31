import { CromossomoSorterService } from './services/cromossomo-sorter.service';
import { RoletaService } from './services/roleta.service';
import { AlgoritmoGeneticoService } from './services/algoritmo-genetico.service';
import { ControleDeAcaoService } from './services/controle-de-acao.service';
import { SorteadorService } from './services/sorteador.service';
import { ArquivoEntradaService } from './services/arquivo-entrada.service';
import { IOManagerService } from './services/gerenciador-io.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GeracaoComponent } from './components/geracao/geracao.component';
import { EntradaDadosComponent } from './components/entrada-dados/entrada-dados.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelecaoNaturalRoletaServiceService } from './services/selecao-natural/selecao-natural-roleta-service.service';
import { TimerComponent } from './components/timer/timer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GeracaoComponent,
    EntradaDadosComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule
  ],
  providers: [
    IOManagerService,
    ArquivoEntradaService,
    SorteadorService,
    ControleDeAcaoService,
    AlgoritmoGeneticoService,
    RoletaService,
    CromossomoSorterService,
    SelecaoNaturalRoletaServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

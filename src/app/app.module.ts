import { SorteadorService } from './services/sorteador.service';
import { ArquivoEntradaService } from './services/arquivo-entrada.service';
import { IOManagerService } from './services/gerenciador-io.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { GeracaoComponent } from './components/geracao/geracao.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GeracaoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IOManagerService, ArquivoEntradaService, SorteadorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

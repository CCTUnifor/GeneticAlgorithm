import { ArquivoEntradaService } from './services/arquivo-entrada.service';
import { IOManagerService } from './services/gerenciador-io.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IOManagerService, ArquivoEntradaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

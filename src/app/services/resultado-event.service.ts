import { Observable } from 'rxjs/Observable';
import { Cromossomo } from './../entities/cromossomo';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ResultadoEventService {
  private resultadoEventSource = new ReplaySubject<Cromossomo>();
  public handleAdd: Observable<any> = this.resultadoEventSource.asObservable();
  
  public add(cromossomo: Cromossomo){
    this.resultadoEventSource.next(cromossomo);
  }
}

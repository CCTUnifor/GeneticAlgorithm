import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {
  public tempo: number = 0;

  public get time(): string {
    return this.converter(this.tempo);
  }

  public converter(numero: number) {
    let minutes: any = Number(numero / 60);
    let seconds: any = (numero % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
      minutes = minutes.substr(0, 2);
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  constructor() { }

}

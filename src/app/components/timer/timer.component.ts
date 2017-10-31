import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private tempo: number = 0;
  private get time(): string {
    let minutes: any = Number(this.tempo / 60);
    let seconds: any = (this.tempo % 60);
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

  ngOnInit() {
    setInterval(() => {
      this.tempo++;
    }, 1000);
  }

}

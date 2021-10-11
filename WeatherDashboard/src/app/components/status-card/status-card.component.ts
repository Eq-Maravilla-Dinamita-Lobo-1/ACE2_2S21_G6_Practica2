import { Component, OnInit } from '@angular/core';

enum Status {
  NORMAL_WIND,
  STRONG_WIND,
  CLOUDY_WITH_RAIN,
  CLOUDY_WITHOUT_RAIN,
  CLEAR_WITH_HEAT,
  CLEAR_WITHOUT_HEAT
}

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {

  windStatus : Status;
  visibility: Status;

  constructor() { 
    this.windStatus = Status.NORMAL_WIND;
    this.visibility = Status.CLEAR_WITHOUT_HEAT;
  }

  ngOnInit(): void {
  }

}

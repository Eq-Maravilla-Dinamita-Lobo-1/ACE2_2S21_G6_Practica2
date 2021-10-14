import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';

export enum Status {
  NORMAL_WIND,
  STRONG_WIND,
 
  CLOUDY,
  CLEAR,

  WITH_RAIN,
  WITHOUT_RAIN,

  WITH_HEAT,
  WITHOUT_HEAT
}

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss']
})
export class StatusCardComponent implements OnInit {
  
  //@ts-ignore
  windStatus : Status;
  //@ts-ignore
  visibility: Status;
  //@ts-ignore
  rainStatus: Status;
  //@ts-ignore
  hotStatus: Status;

  constructor( private graphService: GraphService) { 
    this.setStatus();
  }

  ngOnInit(): void {
  }

  private setStatus(){
    this.graphService.getActualStatus()
      .subscribe( (result: any) => {
          console.log("STATUS:",  result[0]);
          const data = result[0]

          if (data.windspeed < 50 ) this.windStatus = Status.NORMAL_WIND
          else this.windStatus = Status.STRONG_WIND

          if (data.temperature <= 20 ) this.hotStatus = Status.WITHOUT_HEAT
          else this.hotStatus = Status.WITH_HEAT
          
      }, error => console.error( "ERROR GET STATUS",error) )
  }

}

import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private endpoint: string;

  constructor( private mqttService : MqttService ) { 
    this.endpoint = 'ACYE2_G6';
  }

  topic( topicId: string ) : Observable<IMqttMessage> {
    let topicName = `${this.endpoint}/${topicId}`;
    console.log(`${this.endpoint}/${topicId}`);
    return this.mqttService.observe(topicName);
  }
}

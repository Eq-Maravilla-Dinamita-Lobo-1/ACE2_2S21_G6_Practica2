import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventMqttService } from './services/event-mqtt.service';
import { IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	
    temperature = 30.0;
    humidity = 20.0;
    light = 10.0;
    windSpeed = 40.0;
    windDirection = "Norte";

    now : Date = new Date();


    //@ts-ignore
    subscription : Subscription;

    constructor( private primengConfig: PrimeNGConfig, private readonly eventMqttService: EventMqttService){
        setInterval( () => { this.now = new Date() }, 1 )
    }


    ngOnInit() {
        this.subscribeToTopic();
        this.primengConfig.ripple = true;


    }

    ngOnDestroy(){
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


   
    private subscribeToTopic(){
        this.subscription = this.eventMqttService.topic('data')
            .subscribe( (data: IMqttMessage) => {
                const json = JSON.parse(data.payload.toString());
                // console.log(json);
                this.temperature = json.temperature;
                this.humidity = json.humidity;
                this.light = json.Luminocidad;
                this.windSpeed = json.windSpeed;
                this.windDirection = json.windDirection;
            });
    }
  
}

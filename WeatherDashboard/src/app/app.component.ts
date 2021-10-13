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

    dateStr: any;
    time: any;

    options: any;
    options2: any;
    selectedOption = ""
    selectedOption2 = ""


    lineStylesData: any;
    basicOptions: any;

    //@ts-ignore
    subscription : Subscription;

    constructor( private primengConfig: PrimeNGConfig, private readonly eventMqttService: EventMqttService){
        let dt = new Date();
        this.dateStr = Date.now()
        this.time = dt.getTime()

    }


    ngOnInit() {
        this.subscribeToTopic();
        this.primengConfig.ripple = true;
        this.options = [
            {name: 'Hoy', code: 'NY'},
            {name: 'Ayer', code: 'RM'},
            {name: 'Esta Semana', code: 'LDN'},
            {name: 'Semana Pasada', code: 'IST'},
            {name: 'Este mes', code: 'PRS'},
            {name: 'Mes Pasado', code: 'PRS'}
        ];

        this.options2 = [
            {name: 'Media', code: 'NY'},
            {name: 'Mayor', code: 'RM'},
            {name: 'Menor', code: 'LDN'},
        ];

        this.lineStylesData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                
                {
                    label: 'Third Dataset',
                    data: [12, 51, 62, 33, 21, 62, 45],
                    fill: true,
                    borderColor: '#FFA726',
                    tension: .4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };

    
        this.applyDarkTheme();
    }

    ngOnDestroy(){
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private applyDarkTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    },
                    // type: 'time',
                    time: {
                    // Luxon format string
                    // tooltipFormat: 'DD T'
                    },
                    title: {
                    display: true,
                    text: 'Date'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    },
                    title: {
                        display: true,
                        text: 'Valor'
                    }
                }
            }
        };

    }

    onChange() {
        console.log("OPTION1: ",this.selectedOption, " OPTION2: ", this.selectedOption2);      
    }

    private subscribeToTopic(){
        this.subscription = this.eventMqttService.topic('data')
            .subscribe( (data: IMqttMessage) => {
                console.log(data.payload.toString());
                
            });
    }
  
}

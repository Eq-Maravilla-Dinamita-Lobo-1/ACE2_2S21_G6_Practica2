import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";

import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { MeasureCardComponent } from './components/measure-card/measure-card.component';
import { FormsModule } from '@angular/forms';
import { StatusCardComponent } from './components/status-card/status-card.component';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    // hostname: 'test.mosquitto.org' , 
    // port: 8083,
    hostname: 'localhost' , 
    port: 9000,
    protocol: "ws",
    path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    MeasureCardComponent,
    StatusCardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    PrimengModule,

    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

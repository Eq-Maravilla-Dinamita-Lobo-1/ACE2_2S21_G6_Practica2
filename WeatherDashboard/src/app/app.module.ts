import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";

import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { MeasureCardComponent } from './components/measure-card/measure-card.component';
import { FormsModule } from '@angular/forms';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { GraphicComponent } from './components/graphic/graphic.component';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  // hostname: 'test.mosquitto.org' , 
  // port: 8083,
  hostname: 'my-broker-acye2.herokuapp.com' , 
  protocol: "wss",
  path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    MeasureCardComponent,
    StatusCardComponent,
    GraphicComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,

    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

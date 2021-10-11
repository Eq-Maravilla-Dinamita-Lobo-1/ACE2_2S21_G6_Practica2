import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { MeasureCardComponent } from './components/measure-card/measure-card.component';
import { FormsModule } from '@angular/forms';
import { StatusCardComponent } from './components/status-card/status-card.component';

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
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

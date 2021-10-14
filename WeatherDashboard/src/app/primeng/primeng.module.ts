import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  exports: [
    CardModule,
    CalendarModule, 
    ChartModule,
    DropdownModule,
    TabViewModule,
  ]
})
export class PrimengModule { }

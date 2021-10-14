import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    CalendarModule, 
    ChartModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
  ]
})
export class PrimengModule { }

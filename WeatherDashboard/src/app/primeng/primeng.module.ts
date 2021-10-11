import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  exports: [
    CardModule,
    ChartModule,
    DropdownModule,
    TabViewModule,
  ]
})
export class PrimengModule { }

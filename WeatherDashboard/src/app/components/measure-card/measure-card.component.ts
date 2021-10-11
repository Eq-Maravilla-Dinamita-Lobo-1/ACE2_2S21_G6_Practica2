import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-measure-card',
  templateUrl: './measure-card.component.html',
  styleUrls: ['./measure-card.component.scss']
})
export class MeasureCardComponent implements OnInit {

  @Input() title = '';
  @Input() imgSrc = '';
  @Input() sub = '';
  @Input() sup = '';
  @Input() value:any;
  // @Input() value:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

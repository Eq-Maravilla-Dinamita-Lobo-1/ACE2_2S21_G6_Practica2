import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {

    options: any;
    options2: any;
    selectedOption = "today"
    selectedOption2 = "avg"
    valueDate: Date = new Date();
    tabSelected = 0;
    visible : boolean = false;
    display : boolean = false;

    lineStylesData: any;
    basicOptions: any;
    xText : string = 'Horas';
    yText: string = '';

    data: any;
    chartOptions: any;
    constructor( private grahpService : GraphService) { }

    ngOnInit(): void {

        this.options = [
            {name: 'Hoy', code: 'today'},
            {name: 'Ayer', code: 'yesterday'},
            {name: 'Esta Semana', code: 'week'},
            {name: 'Semana Pasada', code: 'lastweek'},
            {name: 'Este mes', code: 'month'},
            {name: 'Mes Pasado', code: 'lastmonth'},
            {name: 'Fecha Específica', code: 'date'},
        ];

        this.options2 = [
            {name: 'Media', code: 'avg'},
            {name: 'Mayor', code: 'max'},
            {name: 'Menor', code: 'min'},
        ];

        this.getData();    
    }

    private graph( labels: any, data: any){
       
        this.lineStylesData = {
            labels,
            datasets: [
                
                {
                    label: '',
                    data,
                    fill: true,
                    borderColor: '#FFA726',
                    tension: .4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        // color: 'rgba(255,255,255,0.2)'
                    },
                    title: {
                    display: true,
                    text: this.xText
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        // color: 'rgba(255,255,255,0.2)'
                    },
                    title: {
                        display: true,
                        text: this.yText
                    }
                }
            }
        };

    }

    private graphWindSpeed( data: any){

        this.data = {
            labels: ['Norte', 'Este', 'Sur', 'Oeste'],
        
            datasets: [
                {
                    label: '',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    pointLabels: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                    angleLines: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }
        }
    }

    getData(){

        let value = ''
        if (this.tabSelected == 0) { 
            value = 'temperature';
            this.yText = 'Grados Celcius';
        }
        else if (this.tabSelected == 1) {
            value = 'humidity';
            this.yText = 'Porcentaje';
        }
        else if (this.tabSelected == 2) {
            value = 'brightness';;
            this.yText = 'Lúmenes (lm)';
        } 
            
        else if (this.tabSelected == 3) {
            value = 'windspeed';
            this.yText = 'Kilómetro por Hora (km / h)';
        }
        else {
            value = 'winddirection'
        }


        if (this.visible) {
            this.grahpService.getDataByDate(this.valueDate, this.selectedOption, this.selectedOption2)
                .subscribe( data => this.normalizeData(data), error => console.error("ERROR TO GRAPH", error))
            console.log("Grahp by date: ", this.valueDate);
        }
        else {
            this.grahpService.getData(this.selectedOption, this.selectedOption2, value)
                .subscribe( data => this.normalizeData(data), error => console.error("ERROR TO GRAPH", error))
        }

        
    }

    private normalizeData( data: any ){
        console.log(data);

        if ( this.tabSelected == 4 ) {
            let values = [0, 0, 0]
            data.forEach( (item: any) => {
                if(item.direction == "Norte" ) values[0] = item.cont
                else if(item.direction == "Este" ) values[1] = item.cont
                else if(item.direction == "Sur" ) values[2] = item.cont
                else if(item.direction == "Oeste" ) values[3] = item.cont
            })
        
            this.graphWindSpeed(values)
            return;
        }

        let y: any = [];
        let x: any = [];

        data.forEach( (item: any) => {
            console.log(item);
            y.push(Object.values(item)[0])
            x.push(Object.values(item)[1])
        })
        
        this.graph(x, y);
    }

    onChange() {
        console.log("OPTION1: ",this.selectedOption, " OPTION2: ", this.selectedOption2);     
        if (this.selectedOption === "today" || this.selectedOption === "yesterday"  ) {
            this.visible = false;
            this.xText = "Horas"
        }
        else if (this.selectedOption === "date"){
            this.visible = true;
            this.xText = "Horas"
        }
        else {
            this.visible = false;
            this.xText = "Dias"
        }
        this.getData();
    }

    handleChange(e :any) {
        this.tabSelected = e.index;
        this.getData();
    }


    showDialog() {
        this.display = true;
    }


}

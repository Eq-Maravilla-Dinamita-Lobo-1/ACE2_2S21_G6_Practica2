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

    lineStylesData: any;
    basicOptions: any;
    xText : string = 'Horas';
    yText: string = '';

    temperatureData  = [];
    temperatureLabel = [];

    humidityData    = [];
    humidityLabel   = [];

    windSpeedData   = [];
    windSpeedLabel  = [];

    lightData       = [];
    lightLabel      = [];

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
        this.graph(['January', 'February', 'March', 'April', 'May', 'June', 'July'],[12, 51, 62, 33, 21, 62, 45])



        this.data = {
            labels: ['Norte', 'Este', 'Sur', 'Oeste'],
        
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 100]
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
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

    private graph( labels: any, data: any){
        this.lineStylesData = {
            labels,
            datasets: [
                
                {
                    label: 'Third Dataset',
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

    getData(){

        let type = ''
        if (this.tabSelected == 0) { 
            type = 'temperature';
            this.yText = 'Grados Celcius';
        }
        else if (this.tabSelected == 1) {
            type = '';
            this.yText = 'Porcentaje';
        }
        else if (this.tabSelected == 2) {
            type = '';;
            this.yText = 'Lúmenes (lm)';
        } 
            
        else if (this.tabSelected == 3) {
            type = '';
            this.yText = 'Kilómetro por Hora (km / h)';
        }
        else {
            type = ''
        }

        this.graph([], []);

        if (this.visible) {
            // this.grahpService.grahp(type, this.selectedOption, this.selectedOption2)
            //     .subscribe( (data: any) => {
            //         console.log(data);
                    
            //         // this.graph([], []);
            //     }, error => console.error("ERROR TO GRAPH", error))
            console.log("Grahp by date: ", this.valueDate);
            
        }
        else {
            // this.grahpService.grahp(type, this.selectedOption, this.selectedOption2)
            //     .subscribe( (data: any) => {
            //         console.log(data);
                    
            //         // this.graph([], []);
            //     }, error => console.error("ERROR TO GRAPH", error))
        }

        
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


}

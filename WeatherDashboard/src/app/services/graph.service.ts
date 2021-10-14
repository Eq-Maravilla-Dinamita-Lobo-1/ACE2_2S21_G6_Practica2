import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private URI = 'http://localhost:3100'
  constructor( private http: HttpClient) { }

  getData(type: string, filter: string, value: string){
    return this.http.get( `${this.URI}/${type}/${filter}/${value}`)
  }

  getDataByDate(date: Date, filter: string, value: string){
    return this.http.get( `${this.URI}/date/${date}/${filter}/${value}`)
  }

  getActualStatus(){
    return this.http.get( `${this.URI}/actualStatus`)
  }
}

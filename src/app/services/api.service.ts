import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igps } from '../models/gps.interface';
import { ILatLng } from '../models/latLng.interface';
import { ILocation } from '../models/location.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, public dataService: DataService) { }

  

 
  //locations: ILocation = new ILocation();
 

  public getCoordinates():Observable<Array<Igps>>{
    const url: string = "http://localhost:56173/api/Location";
    return this.http.get(url, {}) as Observable<Array<ILocation>>;
  }



  postCoordinates(locationData: Array<Igps>):Observable<Igps>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })  
    }
    const url: string = "http://localhost:56173/api/Location";
    locationData = this.dataService.cordinatsArray;
  
    return this.http.post<Igps>(url, locationData, httpOptions);
    
  }

  postCoordinatesWaterOrLand(locationData: string):Observable<Igps>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })  
    }
    const url: string = "https://api.onwater.io/api/v1/results";
    locationData = '["23.92323,-66.3","42.35,-71.1"]';
  
    return this.http.post<Igps>(url, locationData, httpOptions);
    
  }
  

 

  
  
}

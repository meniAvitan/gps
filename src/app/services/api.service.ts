import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { CreateRouteComponent } from '../components/create-route/create-route.component';
import { Igps } from '../models/gps.interface';
import { ILandOrWather } from '../models/landOrWather.interface';
import { ILatLon } from '../models/latLon.interface';
import { ILocation } from '../models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
public api!: any
  constructor(private http: HttpClient) { }

 
  locations: ILocation = new ILocation();
  l: CreateRouteComponent = new CreateRouteComponent(this.http, this.api)

  public getCoordinates():Observable<Array<ILocation>>{
    const url: string = "http://localhost:56173/api/Location";
    return this.http.get(url, {}) as Observable<Array<ILocation>>;
  }



  // public postCoordinates():Observable<Igps>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type' : 'application/json'
  //     })  
  //   }
  //   const url: string = "http://localhost:56173/api/Location";
  //   var a =  this.locationData.locationArray;
  //   console.log("-----TEST--------", a);
    
    
  //   return this.http.post<Igps>(url, a, httpOptions);
    
  // }
  

 

  
  
}

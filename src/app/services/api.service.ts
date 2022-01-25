import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CreateRouteComponent } from '../components/create-route/create-route.component';
import { Igps } from '../models/gps.interface';
import { ILandOrWather } from '../models/landOrWather.interface';
import { ILatLon } from '../models/latLon.interface';
import { ILocation } from '../models/location.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private setData: any = new BehaviorSubject("")
  shareData = this.setData.asObservable();
  constructor(private http: HttpClient, public dataService: DataService) { }

  setDataI(param: Igps){
    this.setData.next(param);
  }

 
  locations: ILocation = new ILocation();
 

  public getCoordinates():Observable<Array<ILocation>>{
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
  

 

  
  
}

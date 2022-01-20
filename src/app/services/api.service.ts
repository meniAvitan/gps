import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Igps } from '../models/gps.interface';
import { ILocation } from '../models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // locationData: AppComponent = new AppComponent();
 
  locations: ILocation = new ILocation();

  public getCoordinates():Observable<Array<ILocation>>{
    const url: string = "http://localhost:56173/api/Location";
    return this.http.get(url, {}) as Observable<Array<ILocation>>;
  }
  

 

  
  
}

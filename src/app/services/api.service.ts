import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { IAlbom } from '../models/alboms.interface';
import { ILocation } from '../models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  locationData: AppComponent = new AppComponent();
  locations: ILocation = new ILocation();

  public getAlbom():Observable<Array<ILocation>>{
    const url: string = "http://localhost:56173/api/Person";
    return this.http.get(url, {}) as Observable<Array<ILocation>>;
  }
  

  public postAlbom():Observable<Array<ILocation>>{
    const url: string = "http://localhost:56173/api/Person";
    return this.http.post<Array<ILocation>>(url, location);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Igps } from '../models/gps.interface';
import { ILandOrWather } from '../models/landOrWather.interface';
import { ILatLon } from '../models/latLon.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public cordinatsArray: Igps [] = [];

  public lat!: any;
  public lon!: any;


  constructor(private http: HttpClient) { }

  postLatLon():Observable<ILatLon>{
    this.lat =  this.cordinatsArray.map(x => x.lat);
    this.lon =  this.cordinatsArray.map(x => x.lng);
    var lat  = this.lat[this.lat.length-1]
    var lon  = this.lon[this.lon.length-1]
  
    const url: string = `https://api.onwater.io/api/v1/results/${lat},${lon}?access_token=UHsEaK7xtY5nxUXMsLxA`;
    console.log("URL",url);
    
    return(url) as unknown as Observable<ILatLon>;
  }

  public getLandOrWather():Observable<ILandOrWather>{
    var lat = this.lat[this.lat.length-1];
    var lon = this.lon[this.lon.length-1];
    
    const url: string = `https://api.onwater.io/api/v1/results/${lat},${lon}?access_token=UHsEaK7xtY5nxUXMsLxA`;
    return this.http.get(url, {}) as Observable<ILandOrWather>;
  }

}

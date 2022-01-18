import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {ILocation} from '../models/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public random: number = Math.floor(Math.random() * 100);

  public locationSubject$: Subject<ILocation> = new Subject()

  private _location: ILocation[] = [];



  public getLocation(): ILocation[]{
    return this._location
  }
  public setLocation(locations: ILocation[]): void{
    this._location = [...this._location, ...locations]
  }

  constructor() { }
}

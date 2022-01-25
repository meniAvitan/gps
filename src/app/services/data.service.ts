import { Injectable } from '@angular/core';
import { Igps } from '../models/gps.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public cordinatsArray: Igps [] = [];


  constructor() { }

}

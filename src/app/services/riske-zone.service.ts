import { Injectable } from '@angular/core';
import { ILocationsRadius } from '../models/locationsRadius.interface';

@Injectable({
  providedIn: 'root'
})
export class RiskeZoneService {
  
  public riskZoneList: Record<string, ILocationsRadius> = {
    venezuela: {
      center: { lat: 14.500277783764705, lng: -49.1520336671076 },
      population: 2748983,
    },
    madagaskar: {
      center: { lat: -34.083178367763717, lng: 43.8668774171076 },
      population: 11141112,
    },
    india: {
      center: { lat: 13.091959703067056, lng: 63.7228344483576 },
      population: 11148673,
    },
    tanznia: {
      center: { lat: -5.972932, lng:  43.807736 },
      population: 2714867,
    },
    indonezia: {
      center: { lat: -8.221848, lng: 116.996939 },
      population: 2714673,
    },
    // zone_6: {
    //   center: { lat: 32.767635,  lng: 17.841796 },
    //   population: 1114861,
    // },
    // zone_7: {
       
    //   center: { lat: 13.091959703067056, lng: 63.7228344483576 },
    //   population: 27148673,
    // },
    // zone_8: {
    //   center: { lat: 13.091959703067056, lng: 63.7228344483576 },
    //   population: 27148673,
    // },
  };
  constructor() { }

  arePointsNear(checkPoint: any, centerPoint: any, km: any) { 
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  interpolate(a:any, b: any, t: any) // points A and B, frac between 0 and 1
  {
      var nx = a.lat + (b.lat - a.lat) * t;
      var ny = a.lng + (b.lng - a.lng) * t;

      return { lat: nx, lng: ny };
  }
}

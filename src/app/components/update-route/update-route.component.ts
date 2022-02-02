import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Igps } from 'src/app/models/gps.interface';
import { environment } from 'src/environment/enviroment.pord';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit {

  public locationArray : any[] = [];

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: environment.google_maps_api
    })
    loader.load().then(() => {
      let map = new google.maps.Map(
        document.getElementById("map3") as HTMLElement,
        {
          zoom: 2,
          center: { lat: 12.0572243, lng: 49.0385085  },
          mapTypeId: "terrain",
        }
      );
      const flightPlanCoordinates = [
        { lat: -5.972932, lng:  43.807736 },
        { lat: 13.091959703067056, lng: 63.7228344483576 },
        { lat: -35.083178367763717, lng: 46.8668774171076 },
        { lat: 14.500277783764705, lng: -49.1520336671076 },
      ];

      const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        editable: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map,
      });

      
      this.locationArray.push({
        id: 0,
        lat: flightPlanCoordinates.map(x=>x.lat),
        lng: flightPlanCoordinates.map(x=>x.lng),
      })

      console.log(this.locationArray.map(x=>x));
      

    })
    
  }


}

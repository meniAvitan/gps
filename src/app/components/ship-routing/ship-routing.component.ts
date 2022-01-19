import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ILocation } from 'src/app/models/location.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ship-routing',
  templateUrl: './ship-routing.component.html',
  styleUrls: ['./ship-routing.component.css']
})
export class ShipRoutingComponent implements OnInit {

  constructor( public api: ApiService) { }
  public locations!: Array<ILocation>;

  ngOnInit(): void {

    let loader = new Loader({
      apiKey: 'AIzaSyD1oPJilzUAzjOsz4m2IpoYMVZOk8r2YiE'
    })
    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 7,
          center: { lat: 12.0572243, lng: 49.0385085  },
          mapTypeId: "terrain",
        }
      );
      this.api.getAlbom().subscribe((data)=>{
        console.log(data);
        this.locations = data;
        let filteredLocations = data.filter(function (currentElement) {
          return currentElement.lat && currentElement.lng;
        });
        console.log("filteredLocations -> ",filteredLocations); 
        
      }, err => console.log(err)
      )

      const flightPlanCoordinates = [
        {id: 46, lat: 14.0371, lng: 46.9658},
        {id: 49, lat: 11.6522, lng: 49.0861},
        {id: 50, lat: 12.1253, lng: 47.7128},
      ];
      const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      flightPath.setMap(map);
    }
  )}
  
}

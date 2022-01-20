import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { ILocation } from 'src/app/models/location.interface';
import { ILocationsRadius } from 'src/app/models/locationsRadius.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ship-routing',
  templateUrl: './ship-routing.component.html',
  styleUrls: ['./ship-routing.component.css']
})
export class ShipRoutingComponent implements OnInit {

  constructor( public api: ApiService) { }
  public locations!: Array<ILocation>;
  public riskZoneCircle!: any;
  public infoWindow!: google.maps.InfoWindow;

public riskZoneList: Record<string, ILocationsRadius> = {
    chicago: {
      center: { lat: 14.500277783764705, lng: 49.1520336671076 },
      population: 27148,
    },
    newyork: {
      center: { lat: 11.083178367763717, lng: 46.8668774171076 },
      population: 27148,
    },
    vancouver: {
      center: { lat: 13.091959703067056, lng: 51.7228344483576 },
      population: 27148,
    },
  };
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyD1oPJilzUAzjOsz4m2IpoYMVZOk8r2YiE'
    })
    loader.load().then(() => {
      let map = new google.maps.Map(
        document.getElementById("map2") as HTMLElement,
        {
          zoom: 7,
          center: { lat: 12.0572243, lng: 49.0385085  },
          mapTypeId: "terrain",
        }
      );
      this.api.getCoordinates().subscribe((data)=>{
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
      
      for (var riskZone in this.riskZoneList) {
        // Add the circle for this city to the map.
        this.riskZoneCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: this.riskZoneList[riskZone].center,
          radius: Math.sqrt(this.riskZoneList[riskZone].population) * 100,
        });
      }
      this.riskZoneCircle.addListener("click", (event: any) => this.showArrays(event));
      this.infoWindow = new google.maps.InfoWindow();


    })

  }

  showArrays(event: any) {
    // Since this polygon has only one path, we can call getPath() to return the
    // MVCArray of LatLngs.
    // @ts-ignore
    
    const polygon = this as google.maps.Polygon;
    const vertices = polygon.getPath();
  
    let contentString =
      "<b>Bermuda Triangle polygon</b><br>" +
      "Clicked location: <br>" +
      event.latLng.lat() +
      "," +
      event.latLng.lng() +
      "<br>";
  
    // Iterate over the vertices.
    for (let i = 0; i < vertices.getLength(); i++) {
      const xy = vertices.getAt(i);
  
      contentString +=
        "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
    }
  
    // Replace the info window's content and position.
    this.infoWindow.setContent(contentString);
    this.infoWindow.setPosition(event.latLng);
  let map!: google.maps.Map;
    this.infoWindow.open(map);
  }
  

}

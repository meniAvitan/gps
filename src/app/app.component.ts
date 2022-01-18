import { Component, NgModule, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { LocationService } from './services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit 
{
  title="gps"
  destroy: boolean = true;
  destroyToggle(){
    this.destroy = !this.destroy;
  }


    poly!: google.maps.Polyline;
    map!: google.maps.Map;


    ngOnInit(): void {
      var locations: LocationService = new LocationService();
      
      let loader = new Loader({
        apiKey: 'AIzaSyCCEFMnHK46CZ0DPTVpHDLhGKKnQiMnt8I'
      })
      loader.load().then(() => {

        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            zoom: 3,
            center: { lat: 0, lng: -180 },
            mapTypeId: "terrain",
          }
        );
        const flightPlanCoordinates = [
       
          {lat: 35.4567, lng: 24.5678},
          {lat: 35.4567, lng: 35.5678}
          
        ];
        const flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
      
        flightPath.setMap(map);
      });
    }
  
    
        // this.poly = new google.maps.Polyline({
        //   strokeColor: "#000000",
        //   strokeOpacity: 1.0,
        //   strokeWeight: 3,
        // });
        // this.poly.setMap(this.map);
        // Add a listener for the click event
        // this.map.addListener("click", (event: google.maps.MapMouseEvent) => this.addLatLng(event));
      
    
      


    
    // locationArray : any[] = [];
    // Handles click events on a map, and adds a new point to the Polyline.
    // addLatLng(event: google.maps.MapMouseEvent) {
    //   const path = this.poly.getPath();

    //   // Because path is an MVCArray, we can simply append a new coordinate
    //   // and it will automatically appear.
      
    //   path.push(event.latLng);

    //   // Add a new marker at the new plotted point on the polyline.
    //   new google.maps.Marker({
    //     position: event.latLng,
    //     title: "#" + path.getLength(),
    //     map: this.map,
    //   });
    //   lat: Number;
    //   lng: Number;

    //   this.locationArray.push({
    //       lat: event.latLng!.lat(),
    //       lng: event.latLng!.lng()
    //   });
    //   var postLocations = this.locationArray.map(x => x.lat)
    //   console.log(postLocations);
    //   // this.post.addLocations(postLocations);
    //   // console.log('test');

      
      
    // }

    


}  

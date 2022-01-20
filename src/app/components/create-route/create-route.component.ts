import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { Observable } from 'rxjs';
import { Igps } from 'src/app/models/gps.interface';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  constructor(private http: HttpClient) { }

  poly!: google.maps.Polyline;
  map!: google.maps.Map;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyD1oPJilzUAzjOsz4m2IpoYMVZOk8r2YiE'
    })
    loader.load().then(() => {

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 7,
        center: { lat: 12.0572243, lng: 49.0385085  },
        clickableIcons: false
      });
     
      this.poly = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.poly.setMap(this.map);
    
      // Add a listener for the click event
      this.map.addListener("click", (event: google.maps.MapMouseEvent) => this.addLatLng(event));
    }
    )}
    locationArray : Igps[] = [];

    addLatLng(event: google.maps.MapMouseEvent) {
      const path = this.poly.getPath();

      // Because path is an MVCArray, we can simply append a new coordinate
      // and it will automatically appear.
      
      path.push(event.latLng);

      // Add a new marker at the new plotted point on the polyline.
      new google.maps.Marker({
        position: event.latLng,
        title: "#" + path.getLength(),
        map: this.map,
      });
     
      lat: Number;
      lng: Number;

      this.locationArray.push({
          Id: 0,
          Lat: event.latLng!.lat(),
          Lng: event.latLng!.lng()
      });
      var postLocations = this.locationArray.map(x => x)
      console.log("postLocations",postLocations);
      
      // this.post.addLocations(postLocations);
      // console.log('test');

      
      
    }

    public getLocationArray(){
      var a =  this.locationArray;
      console.log("-----TEST--------", a);
    }

    public postAlbom():Observable<Igps>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
        })  
      }
      const url: string = "http://localhost:56173/api/Location";
      var a =  this.locationArray;
      console.log("-----TEST--------", a);
      
      
      return this.http.post<Igps>(url, a, httpOptions);
      
    }
    onSubmit(){
      this.postAlbom().subscribe(
        res =>{
          console.log(res);
          
        },
        err =>{
          console.log(err);
          
        }
      )
    }
  

}

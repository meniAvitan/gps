import { Component, NgModule, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})





export class AppComponent 
{
  title="gps"
  destroy: boolean = true;
  destroyToggle(){
    this.destroy = !this.destroy;
  }
  constructor(private http: HttpClient) { }


    poly!: google.maps.Polyline;
    map!: google.maps.Map;


    ngOnInit(): void {
      var locations: LocationService = new LocationService();
      
    //   let loader = new Loader({
    //     apiKey: 'AIzaSyD1oPJilzUAzjOsz4m2IpoYMVZOk8r2YiE'
    //   })
    //   loader.load().then(() => {

    //     this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    //       zoom: 7,
    //       center: { lat: 12.0572243, lng: 49.0385085  },
    //       clickableIcons: false
    //     });
       
    //     this.poly = new google.maps.Polyline({
    //       strokeColor: "#000000",
    //       strokeOpacity: 1.0,
    //       strokeWeight: 3,
    //     });
    //     this.poly.setMap(this.map);
      
    //     // Add a listener for the click event
    //     this.map.addListener("click", (event: google.maps.MapMouseEvent) => this.addLatLng(event));
    //   }
    //   )}
    
    // locationArray : Igps[] = [];
    
    // //Handles click events on a map, and adds a new point to the Polyline.
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
    //       Id: 0,
    //       Lat: event.latLng!.lat(),
    //       Lng: event.latLng!.lng()
    //   });
    //   var postLocations = this.locationArray.map(x => x)
    //   console.log("postLocations",postLocations);
      
    //   // this.post.addLocations(postLocations);
    //   // console.log('test');

      
      
    // }
   
    // public getLocationArray(){
    //   var a =  this.locationArray;
    //   console.log("-----TEST--------", a);
    // }
    


    // public postAlbom():Observable<Igps>{
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type' : 'application/json'
    //     })  
    //   }
    //   const url: string = "http://localhost:56173/api/Location";
    //   var a =  this.locationArray;
    //   console.log("-----TEST--------", a);
      
      
    //   return this.http.post<Igps>(url, a, httpOptions);
      
    // }

    // onSubmit(){
    //   this.postAlbom().subscribe(
    //     res =>{
    //       console.log(res);
          
    //     },
    //     err =>{
    //       console.log(err);
          
    //     }
    //   )
     }
  
    
  

}  

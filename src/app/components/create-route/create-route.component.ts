import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { Observable } from 'rxjs';
import { Igps } from 'src/app/models/gps.interface';
import { ILandOrWather } from 'src/app/models/landOrWather.interface';
import { ILatLon } from 'src/app/models/latLon.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})

export class CreateRouteComponent implements OnInit {


  constructor(private http: HttpClient, public api: ApiService, public dataService: DataService) { }
  
  public landOrWather: boolean = true;
  public lat!: any;
  public lon!: any;
  public locations!: Igps [];
  
 


  poly!: google.maps.Polyline;
  map!: google.maps.Map;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: environment.google_maps_api
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
 
      path.push(event.latLng);

      // Add a new marker at the new plotted point on the polyline. 
      new google.maps.Marker({
        position: event.latLng,
        title: "#" + path.getLength(),
        map: this.map,
      });

      lat: Number;
      lng: Number;
      this.dataService.cordinatsArray.push({
        id: 0,
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng()
      });
      this.locationArray.push({
          id: 0,
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng()
      });
      var postLocations = this.dataService.cordinatsArray.map(x => x)
      console.log("postLocations",postLocations);

      console.log("a=" , this.lat);
      
      this.postLatLon()

      console.log("b=", this.lat[this.lat.length-1]);
      this.getDataLandOrWater();
      
      
      
      
    }
    

    public getLocationArray(){
      var a =  this.locationArray.map(x => x.lat);
      console.log("-----TEST--------", a);
    }

    public postLatLon():Observable<ILatLon>{
      this.lat =  this.dataService.cordinatsArray.map(x => x.lat);
      this.lon =  this.dataService.cordinatsArray.map(x => x.lng);
      var lat  = this.lat[this.lat.length-1]
      var lon  = this.lon[this.lon.length-1]
    
      const url: string = `https://api.onwater.io/api/v1/results/${lat},${lon}?access_token=6RN4htEi68V_hBEVzebP`;
      console.log("URL",url);
      
      return(url) as unknown as Observable<ILatLon>;
    }
    
    getDataLandOrWater(){
      this.getLandOrWather().subscribe((data)=>{

        console.log("a ->",  this.landOrWather);
        this.landOrWather = data.water; 
        
        if(this.landOrWather == false){
          this.landOrWather = this.landOrWather;
          console.log("b -> ",this.landOrWather); 
          
          alert("this location are in land! you must set a location in water...");
        }else{
          console.log("b -> ",this.landOrWather); 
         
        }       
        console.log(data);  
            
      })
    }
    
    public getLandOrWather():Observable<ILandOrWather>{
      var lat = this.lat[this.lat.length-1];
      var lon = this.lon[this.lon.length-1];
      
      const url: string = `https://api.onwater.io/api/v1/results/${lat},${lon}?access_token=6RN4htEi68V_hBEVzebP`;
      return this.http.get(url, {}) as Observable<ILandOrWather>;
    }

    saveCordinats(cordinats: Array<Igps>){
      cordinats = this.dataService.cordinatsArray;
      console.log("cordinats", cordinats);
      
      return cordinats;
    }

    // public postCoordinates():Observable<Igps>{
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type' : 'application/json'
    //     })  
    //   }
    //   const url: string = "http://localhost:56173/api/Location";
    //   var a =  this.dataService.cordinatsArray;
    //   console.log("-----POST CORDINATS--------", a);
    //   return this.http.post<Igps>(url, a, httpOptions);
      
    // }
    
    onSubmit(){
      this.api.postCoordinates(this.dataService.cordinatsArray).subscribe(
        res =>{
          console.log(res);
        },
        err =>{
          console.log(err);
          
        }
      )
    }
  

}

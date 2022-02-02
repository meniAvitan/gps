import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader";
import { Observable } from 'rxjs';
import { Igps } from 'src/app/models/gps.interface';
import { ILandOrWather } from 'src/app/models/landOrWather.interface';
import { ILatLon } from 'src/app/models/latLon.interface';
import { ILocationsRadius } from 'src/app/models/locationsRadius.interface';
import { IRadius } from 'src/app/models/radids.interface';
import { IRiskZones } from 'src/app/models/riskZone.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { RiskeZoneService } from 'src/app/services/riske-zone.service';
import { environment } from 'src/environment/enviroment.pord';






@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})

export class CreateRouteComponent implements OnInit {


  constructor(private http: HttpClient, public api: ApiService, public dataService: DataService, public riskZoneData: RiskeZoneService) { }
  
  public landOrWather: boolean = true;
  public lat!: any;
  public lon!: any;
  public locations!: Igps [];
  public lOw: boolean = true;
  public zones: IRiskZones[] = [];
  public riskZoneCircle!: any;


  poly!: google.maps.Polyline;
  map!: google.maps.Map;

  ngOnInit(): void {
    //window.location.reload()
    let loader = new Loader({
      apiKey: environment.google_maps_api
    })
    loader.load().then(() => {

      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        zoom: 2,
        center: { lat: 12.0572243, lng: 49.0385085  },
        clickableIcons: true,
      });
     
      this.poly = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.poly.setMap(this.map);
      for (var riskZone in this.riskZoneData.riskZoneList) {
        // Add the circle for this city to the map.
        this.riskZoneCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map: this.map,
          center: this.riskZoneData.riskZoneList[riskZone].center, 
          radius: Math.sqrt(this.riskZoneData.riskZoneList[riskZone].population) * 200,
          clickable: false
        }); 
       
        this.zones.push(this.riskZoneData.riskZoneList[riskZone].center); 
      }
      console.log(this.zones);
      
     
      this.map.addListener("click", (event: google.maps.MapMouseEvent) => this.addLatLng(event));
     

    }
  )
}
    locationArray : Igps[] = [];
  
    addLatLng(event: google.maps.MapMouseEvent) {
      const path = this.poly.getPath();
      const click = event.latLng;
      var locs = { lat: event.latLng?.lat(), lng: event.latLng?.lng() };

      path.push(click);
      for(let x = 0; x < this.zones.length-2; x++){
        console.log("zones",this.zones[x]);
        
      var n = this.riskZoneData.arePointsNear(this.zones[x], locs, 900);
      
        if(n){
          console.log(`zones[${x}] = ${this.zones[x]}`);
          
          const marker = new google.maps.Marker({
            map: this.map,
            position: click,
            title: "#" + path.getLength(),
            label: {
              text:"I", //marking all jobs inside radius with I
              color:"white"
            }
          });
        }else{
          const marker = new google.maps.Marker({
            map: this.map,
            position: click,
            title: "#" + path.getLength(),
            label: {
              text:"O", //marking all jobs outside radius with O
              color:"white"
            }
          });
        }
      }
      
      this.dataService.cordinatsArray.push({
          id: 0,
          lat: click!.lat(),
          lng: click!.lng()
      });
      this.locationArray.push({
          id: 0,
          lat: click!.lat(),
          lng: click!.lng(),
          
      });
      
      this.dataService.postLatLon();
      this.getDataLandOrWater();
      

    }
    

   landOrWater():void{
     this.dataService.getLandOrWather().subscribe((data)=>{
      this.landOrWather = data.water; 
        if(this.landOrWather == false){
          this.landOrWather = this.landOrWather;
          
          alert("this location are in land! you must set a location in water...");
          return false;
        }
        else{
          console.log("b -> ",this.landOrWather); 
          return true;
        }
     })
    
   }

    getDataLandOrWater(){
      this.dataService.getLandOrWather().subscribe((data)=>{

        console.log("a ->",  this.landOrWather);
        this.landOrWather = data.water; 
        
        if(this.landOrWather == false){
          this.landOrWather = this.landOrWather;
          console.log("b -> ",this.landOrWather); 
          
          alert("this location are in land! you must set a location in water...");
          
        }else{
          console.log("b -> ",this.landOrWather); 
          
        }       
            
      })
    }
    
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

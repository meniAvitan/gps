import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Igps } from 'src/app/models/gps.interface';
import { ILocation } from 'src/app/models/location.interface';
import { ILocationsRadius } from 'src/app/models/locationsRadius.interface';
import { IRadius } from 'src/app/models/radids.interface';
import { IRiskZones } from 'src/app/models/riskZone.interface';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { RiskeZoneService } from 'src/app/services/riske-zone.service';
import { environment } from 'src/environment/enviroment.pord';

@Component({
  selector: 'app-ship-routing',
  templateUrl: './ship-routing.component.html',
  styleUrls: ['./ship-routing.component.css']
})
export class ShipRoutingComponent implements OnInit {

  constructor( public api: ApiService, public dataService: DataService, public riskZoneData: RiskeZoneService) { }
  
  public riskZoneCircle!: any;
  public x1!: number;
  public y1!: number;
  public x2!: number;
  public y2!: number;
  public lat!: number;
  public lng!: number;
  public zones: IRiskZones[] = [];
  public landOrWather: boolean = true;
  public counter: number = 0;
  public riskZoneFleg!: boolean;
  public riskZoneCounter: number = 0;
  



  
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: environment.google_maps_api
    })
    loader.load().then(() => {
      let map = new google.maps.Map(
        document.getElementById("map2") as HTMLElement,
        {
          zoom: 2,
          center: { lat: 12.0572243, lng: 49.0385085  },
          mapTypeId: "terrain",
        }
      );

      this.api.getCoordinates().subscribe((data)=>{
        //console.log(data);
        let filteredLocations = data.filter(function (currentElement) {
          return currentElement.lat && currentElement.lng;
        });
        //console.log("filteredLocations -> ",filteredLocations); 
        
      }, err => console.log(err)
      )

      const lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 5,
        strokeColor: "#393",
      };
      const line = new google.maps.Polyline({
        path: this.dataService.cordinatsArray,
        icons: [
          {
            icon: lineSymbol,
            offset: "100%",
          },
        ],
        map: map,
        editable: true,
      });
    
      this.animateCircle(line);

      for (var riskZone in this.riskZoneData.riskZoneList) {
        // Add the circle for this city to the map.
        this.riskZoneCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: this.riskZoneData.riskZoneList[riskZone].center, 
          radius: Math.sqrt(this.riskZoneData.riskZoneList[riskZone].population) * 200,
          clickable: false
        }); 
       
        this.zones.push(this.riskZoneData.riskZoneList[riskZone].center); 
        
      }
      console.log("zones", this.zones);

      if(this.dataService.cordinatsArray.length > 1){
        console.log("All cordinats array => ", this.dataService.cordinatsArray);
        
        for (let j = 0; j <= this.dataService.cordinatsArray.length - 1; j++) {
          let flegArray = this.dataService.cordinatsArray.slice(j, j + 2);
          console.log("flegArray", flegArray);

          this.x1 = flegArray[0].lat;
          this.y1 = flegArray[0].lng;

          this.x2 = flegArray[flegArray.length - 1].lat;
          this.y2 = flegArray[flegArray.length - 1].lng;

          for (let i = 0; i < 1; i += 0.1) {

            let linearLocations = this.riskZoneData.interpolate({ lat: this.x1, lng: this.y1 }, { lat: this.x2, lng: this.y2 }, i); // returns {x:3, y:3}
            //console.log("interpolate", linearLocations);
            // const image =
            // "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
            // const beachMarker = new google.maps.Marker({
            //   position: linearLocations,
            //   map,
            //   icon: image,
            // });
            for(let x = 0; x <= this.zones.length - 1; x++){
              var n = this.riskZoneData.arePointsNear(this.zones[x], linearLocations, 750); 


              if(n){
                const image =
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                const beachMarker = new google.maps.Marker({
                  position: this.zones[x],
                  map,
                  icon: image,
                });
                console.log(this.counter++);
              }
            }  
          }
         
        }
        if(this.counter > 1){
          alert(`BOOOM! there are ${this.riskZoneCounter} risk zone`);
        }
        else{
          alert(`Your route is safe! there are ${this.riskZoneCounter} risk zone`);
        }
      }
      
    })

  }

  getDataLandOrWater(){
    
    this.dataService.getLandOrWather().subscribe((data)=>{

      this.landOrWather = data.water; 
      
      if(this.landOrWather == false){
        this.landOrWather = this.landOrWather;
      }else{
       
      }       
      console.log(data);  
          
    })
  }
    
 animateCircle(line: google.maps.Polyline) {
    let count = 0;
  
    window.setInterval(() => {
      count = (count + 1) % 200;
  
      const icons = line.get("icons");
  
      icons[0].offset = count / 2 + "%";
      line.set("icons", icons);
    }, 50);
  }

  resetCordinatsArray(){
    this.dataService.cordinatsArray = []
  }


}

 import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { LocationService } from "src/app/services/location.service";
import { ILocation } from "../../models/location.interface";

@Component({
    selector: 'global-route',
    templateUrl: './route.component.html',
    styleUrls: ['./route.component.css']
})

export class GlobalRoute implements OnInit, OnChanges, AfterViewInit, OnDestroy{
    title = "global route works!";
    constructor(private locationService: LocationService){}

    public locations: ILocation[] = [];
     
    public listOfLocations: ILocation[] = [
        {
            Source: 'Germany',
            Destination: 'Israel',
            lat: 50.8442841,
            lng: 19.4326217,
            isActive: true
        },
        {
            Source: 'Frace',
            Destination: 'Israel',
            lat: 45.8806157,
            lng: 11.0437646,
            isActive: true
        },

    ]

    public deleteLocation(locationIndex: number){
        this.listOfLocations.splice(locationIndex, 1);
    }

    ngOnInit(): void {
        console.log("set locations ", this.locationService.getLocation());
        this.locationService.setLocation(this.listOfLocations);

        this.locations = this.locationService.getLocation()

        this.locationService.locationSubject$.subscribe((data)=>{
            this.locations.push(data);
        })
        
        // console.log("route on init");    
    }

    ngOnChanges(changes: SimpleChanges): void{
        console.log(changes);
        
    }
    ngAfterViewInit(){
        // console.log('after view init');
        
    }

    ngOnDestroy():void{
        // console.log('on Destroy');
        
    }
}
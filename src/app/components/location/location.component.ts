import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import { ILocation } from 'src/app/models/location.interface';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(public api: ApiService) { }

  public locations!: Array<ILocation>;
  public colums: Array<string> = ['Source', 'Destination', 'lat', 'lng', 'isActive'];

  @Input()
  Souece!: ILocation;

  @Input()
  location!: ILocation;

  @Input()
  borderWidth!: number; 

  @Input()
  locationIndex!: number;

  @Output()
  onDeleteLocation: EventEmitter<number> = new EventEmitter();

  public deleteLocation(){
    console.log(this.locationIndex);
    this.onDeleteLocation.emit(this.locationIndex);
    
  }

  ngOnInit(): void {
    this.api.getAlbom().subscribe((data)=>{
      console.log(data);
      this.locations = data;
      let filteredLocations = data.filter(function (currentElement) {
        return currentElement.lat && currentElement.lng;
      });
      console.log("filteredLocations -> ",filteredLocations); 
      
    }, err => console.log(err)
    )


  }

  onSubmit(){
    this.api.postAlbom().subscribe(
      res =>{
        console.log(res);
        

      },
      err =>{
        console.log(err);
        
      }
    )
  }

}



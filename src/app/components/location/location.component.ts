import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { last, Observable } from 'rxjs';
import { Igps } from 'src/app/models/gps.interface';
import { ILocation } from 'src/app/models/location.interface';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor( public api: ApiService) { }
  public locations!: Array<ILocation>;
  

  ngOnInit(): void {
    

    // this.api.getAlbom().subscribe((data)=>{
    //   console.log(data);
    //   this.locations = data;
    //   let filteredLocations = data.filter(function (currentElement) {
    //     return currentElement.lat && currentElement.lng;
    //   });
    //   console.log("filteredLocations -> ",filteredLocations); 
      
    // }, err => console.log(err)
    // )
    
  }
}




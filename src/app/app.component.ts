import { Component, NgModule, OnInit } from '@angular/core';

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
      
      
 
     }
  
    
  

}  

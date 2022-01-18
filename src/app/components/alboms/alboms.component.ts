import { Component, OnInit } from '@angular/core';
import { IAlbom } from 'src/app/models/alboms.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alboms',
  templateUrl: './alboms.component.html',
  styleUrls: ['./alboms.component.css']
})
export class AlbomsComponent implements OnInit {

  constructor(private api: ApiService) { }
  public alboms!: Array<IAlbom>;
  public colums: Array<string> = ['userId', 'id', 'title'];

  ngOnInit(): void {
    // this.api.getAlbom().subscribe((data)=>{
    //   console.log(data);
    //   this.alboms = data;
      
    // }, err => console.log(err)
    // )
  }

}

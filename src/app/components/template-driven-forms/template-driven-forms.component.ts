import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ILocation } from 'src/app/models/location.interface';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.css']
})
export class TemplateDrivenFormsComponent implements OnInit, AfterViewInit {

  @ViewChild('f') form: any;
  
  

  constructor(private locationService: LocationService) { }

  public langs: Array<string> = [
    'english',
    'עברית'
  ]

  ngOnInit(): void {
    console.log("Random Num (Location)", this.locationService.random);
  }

  ngAfterViewInit(): void {
      console.log(this.locationService.getLocation());
      
  }
  public onClickButton():void{
    const location: ILocation = {
      Source: 'Canada',
      Destination: 'Israel',
      lat: 50.8232622,
      lng: -61.6949693,
      isActive: false
    }
    this.locationService.locationSubject$.next(location)

  }
  public onSubmitForm():void{

    console.log('our form ', this.form);
    
  }

}

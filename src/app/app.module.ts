
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LocationComponent } from './components/location/location.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { CreateRouteComponent } from './components/create-route/create-route.component';
import { ShipRoutingComponent } from './components/ship-routing/ship-routing.component';



@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    routingComponents,
    CreateRouteComponent,
    ShipRoutingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

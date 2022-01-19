
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GlobalRoute } from './components/world-route/route.component';
import { AppComponent } from './app.component';
import { LocationComponent } from './components/location/location.component';
import { TemplateDrivenFormsComponent } from './components/template-driven-forms/template-driven-forms.component';
import { FormsModule } from '@angular/forms';
import { AlbomsComponent } from './components/alboms/alboms.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    GlobalRoute,
    LocationComponent,
    TemplateDrivenFormsComponent,
    AlbomsComponent,
    routingComponents
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

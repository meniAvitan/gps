import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoutesHistotyComponent } from "./components/routes-histoty/routes-histoty.component";
import { ShipRoutingComponent } from "./components/ship-routing/ship-routing.component";

const routers: Routes = [
    {path: 'shipRouting', component: ShipRoutingComponent},
    {path: 'routesHistory', component: RoutesHistotyComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
export const routingComponents = [ShipRoutingComponent, RoutesHistotyComponent]
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateRouteComponent } from "./components/create-route/create-route.component";
import { RoutesHistotyComponent } from "./components/routes-histoty/routes-histoty.component";
import { ShipRoutingComponent } from "./components/ship-routing/ship-routing.component";

const routers: Routes = [
    {path: 'shipRouting', component: ShipRoutingComponent},
    {path: 'routesHistory', component: RoutesHistotyComponent},
    {path: 'createRoute', component: CreateRouteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routers)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
export const routingComponents = [ShipRoutingComponent, RoutesHistotyComponent, CreateRouteComponent]


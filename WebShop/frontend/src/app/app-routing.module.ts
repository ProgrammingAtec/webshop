import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: IntroComponent },
    { path: 'about', component: AboutComponent },
    { path: 'delivery', component: DeliveryComponent },
    { path: '**', component: AboutComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

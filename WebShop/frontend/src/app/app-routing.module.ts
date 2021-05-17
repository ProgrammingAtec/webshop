import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { GridComponent } from "./grid/grid.component";
import { HomeComponent } from "./home/home.component";
import { IntroComponent } from "./intro/intro.component";

const catalogMatcher = function(url: UrlSegment[]) {
    return url.length === 1 && url[0].path.match(new RegExp('^men$|^women$|^kids$')) ? ({ consumed: url }) : null;
}

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: IntroComponent },
    { path: 'about', component: AboutComponent },
    { path: 'delivery', component: DeliveryComponent },
    { path: 'grid', component: GridComponent },
    { matcher: catalogMatcher, component: CatalogComponent },
    { path: '**', component: HomeComponent },
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

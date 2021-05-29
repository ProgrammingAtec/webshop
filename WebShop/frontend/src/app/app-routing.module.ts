import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { CatalogComponent } from "./catalog/catalog.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { GridComponent } from "./grid/grid.component";
import { CanActivateGrid } from "./guards/grid.guard";
import { IntroComponent } from "./intro/intro.component";
import { Page404Component } from "./shared/components/page404/page404.component";

const catalogMatcher = function(url: UrlSegment[]) {
    return url.length === 1 && url[0].path.match(new RegExp('^men$|^women$|^kids$')) ? ({ consumed: url }) : null;
}

const routes: Routes = [
    { path: '', component: IntroComponent },
    { path: 'home', component: IntroComponent },
    { path: 'about', component: AboutComponent },
    { path: 'delivery', component: DeliveryComponent },
    { path: 'grid', component: GridComponent },
    { matcher: catalogMatcher, component: CatalogComponent, canActivate: [CanActivateGrid] },
    { path: '**', component: Page404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [CanActivateGrid],
    exports: [RouterModule]
})
export class AppRoutingModule {}

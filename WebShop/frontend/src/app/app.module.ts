import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DeliveryModule } from './delivery/delivery.module';
import { NavComponent } from './nav/nav.component';
import { IntroModule } from './intro/intro.module';
import { WINDOW_PROVIDERS } from './shared/injection-tokens/window.token';
import { NavModule } from './nav/nav.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatalogModule } from './catalog/catalog.module';
import { GridModule } from './grid/grid.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DeliveryModule,
    IntroModule,
    HttpClientModule,
    NavModule,
    CatalogModule,
    GridModule
  ],
  providers: [
    WINDOW_PROVIDERS
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

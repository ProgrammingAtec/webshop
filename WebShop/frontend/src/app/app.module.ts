import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { DeliveryModule } from './delivery/delivery.module';
import { NavComponent } from './nav/nav.component';
import { IntroModule } from './intro/intro.module';
import { WINDOW_PROVIDERS } from './shared/injection-tokens/window.token';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeliveryModule,
    IntroModule,
    HomeModule
  ],
  providers: [
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

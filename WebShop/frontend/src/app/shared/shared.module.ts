import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { PreparedFiltersComponent } from './components/prepared-filters/prepared-filters.component';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';
import { Page404Component } from './components/page404/page404.component';

@NgModule({
  declarations: [
    SliderComponent,
    PreparedFiltersComponent,
    ScrollbarComponent,
    Page404Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    PreparedFiltersComponent,
    ScrollbarComponent,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { PreparedFiltersComponent } from './components/prepared-filters/prepared-filters.component';
import { ScrollbarComponent } from './components/scrollbar/scrollbar.component';



@NgModule({
  declarations: [
    SliderComponent,
    PreparedFiltersComponent,
    ScrollbarComponent
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

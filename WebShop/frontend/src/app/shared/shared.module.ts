import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { PreparedFiltersComponent } from './components/prepared-filters/prepared-filters.component';



@NgModule({
  declarations: [
    SliderComponent,
    PreparedFiltersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliderComponent,
    PreparedFiltersComponent,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { GridComponent } from './grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GridModule { }

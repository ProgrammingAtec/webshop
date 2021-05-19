import { NgModule } from '@angular/core';
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
  ]
})
export class GridModule { }

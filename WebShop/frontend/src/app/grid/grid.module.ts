import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GridModule { }

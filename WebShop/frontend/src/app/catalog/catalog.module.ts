import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CatalogComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CatalogModule { }

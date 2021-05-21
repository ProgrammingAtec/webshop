import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IntroComponent } from './intro.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IntroComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    SharedModule
  ]
})
export class IntroModule { }

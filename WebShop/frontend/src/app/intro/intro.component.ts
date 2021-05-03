import { Component } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  get isMobile(): boolean {
    return this.layoutService.deviceType === 'mobile';
  }

  constructor(
    public layoutService: LayoutService
  ) {}
}

import { Component } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  public get isMobile(): boolean {
    return this.layoutService.deviceType === 'mobile';
  }

  public get isTablet(): boolean {
    return this.layoutService.deviceType === 'tablet';
  }

  public get isComputer(): boolean {
    return this.layoutService.deviceType === 'desktop' || this.layoutService.deviceType === 'laptop';
  }

  public constructor(
    public layoutService: LayoutService
  ) {}
}

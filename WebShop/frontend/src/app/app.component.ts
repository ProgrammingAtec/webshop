import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { WINDOW } from "src/app/shared/injection-tokens/window.token";
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isNavigationItemClosed = false;

  public get isMobile(): boolean {
    return this.layoutService.deviceType === 'mobile';
  }

  public constructor(
    @Inject(WINDOW) private readonly window: Window & Object,
    @Inject(DOCUMENT) private readonly document: Document,
    public readonly layoutService: LayoutService
  ) {
    let vh = this.window.innerHeight * 0.01;
    let vw = this.window.innerWidth * 0.01;
    this.document.documentElement.style.setProperty('--vh', `${vh}px`);
    this.window.addEventListener('resize', () => {
      this.document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
  }

  public toggleNavigationItem(body: HTMLElement): void {
    const isOpened = body.classList.contains('opened');
    body.classList.replace(isOpened ? 'opened' : 'closed', isOpened ? 'closed' : 'opened');
    this.document.documentElement.scrollTop = this.document.documentElement.scrollHeight;
  }
}

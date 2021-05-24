import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../shared/services/layout.service';
import { Aside, NavigationCategory } from './nav.aside';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('nav')
  public navRef: ElementRef<HTMLElement>;

  public aside: Aside;
  public currentCategory: NavigationCategory;
  public showAside: boolean = false;

  public changeRoute: (event: MouseEvent) => void = (event) => {
    if ((event.target as Node).nodeName !== 'A') return;

    this.router.navigate([(event.target as Node).textContent.toLowerCase().replace(' ', '-')]);
  }

  public get isMobile() {
    return this.layoutService.deviceType === 'mobile';
  }

  public get childCategoryHasKids() {
    return !!this.currentCategory.children[0].children.length;
  }

  public constructor(
    private readonly layoutService: LayoutService,
    private readonly router: Router
  ) {
    if (this.isMobile) {
      this.aside = new Aside();
    }
  }

  public ngAfterViewInit(): void {
    if (this.layoutService.deviceType === 'desktop') {
      this.navRef.nativeElement.addEventListener('click', this.changeRoute);
    }
  }

  public toggleAside(): void {
    this.showAside = !this.showAside;
  }

  public categoryChanged(path: string[]): void {
    let categoriesToSearch = this.aside.categories;
    
    for (let i = 0; i < path.length; i++) {
      if (i + 1 === path.length) {
        this.currentCategory = categoriesToSearch.find(category => category.header === path[i]);

        return;
      }

      categoriesToSearch = categoriesToSearch.find(category => category.header === path[i]).children;
    }
  }

  public categoryBack(path: string[]): void {
    let tmpPath = [...path];
    tmpPath.splice(-1, 1);

    if (tmpPath.length) {
      this.categoryChanged(tmpPath);

      return;
    }

    this.currentCategory = null;
  }
}

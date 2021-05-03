import { Component } from '@angular/core';
import { LayoutService } from '../shared/services/layout.service';
import { Aside, NavigationCategory } from './nav.aside';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  aside: Aside;
  currentCategory: NavigationCategory;
  showAside: boolean = false;

  get isMobile() {
    return this.layoutService.deviceType === 'mobile';
  }

  get childCategoryHasKids() {
    console.log('hey: ', !!this.currentCategory.children[0].children.length);
    return !!this.currentCategory.children[0].children.length;
  }

  constructor(
    private readonly layoutService: LayoutService
  ) {
    if (this.isMobile) {
      this.aside = new Aside();
    }
  }

  toggleAside(): void {
    this.showAside = !this.showAside;
  }

  categoryChanged(path: string[]): void {
    let categoriesToSearch = this.aside.categories;

    for (let i = 0; i < path.length; i++) {
      if (i + 1 === path.length) {
        this.currentCategory = categoriesToSearch.find(category => category.header === path[i]);

        return;
      }

      categoriesToSearch = categoriesToSearch.find(category => category.header === path[i]).children;
    }
  }

  categoryBack(path: string[]): void {
    let tmpPath = [...path];
    tmpPath.splice(-1, 1);

    if (tmpPath.length) {
      this.categoryChanged(tmpPath);

      return;
    }

    this.currentCategory = null;
  }
}

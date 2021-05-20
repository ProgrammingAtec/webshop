import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from './catalog.mock';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @ViewChild('verticalSlider') public verticalSlider: ElementRef<HTMLElement>;

  public category;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.determineCategory();
  }

  public scrollVerticalSlide(): void {
    this.verticalSlider.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center'});
  }

  private determineCategory(): void {
    this.category = categories[this.router.url.slice(1, this.router.url.length)];
  }
}

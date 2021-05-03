import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

interface ProductModel {
  imageUrl: string;
  name: string;
  previewDescription: string;
  price: string;
}

const items: ProductModel[] = [
  {
    imageUrl: 'casual_gucci.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '1 990$'
  },
  {
    imageUrl: 'casual_gucci2.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '3 990$'
  },
  {
    imageUrl: 'casual_gucci3.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '1 490$'
  },
  {
    imageUrl: 'casual_gucci.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '1 990$'
  },
  {
    imageUrl: 'casual_gucci2.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '3 990$'
  },
  {
    imageUrl: 'casual_gucci3.png',
    name: 'Brand Textile Yellow Skirt',
    previewDescription: 'Preside Description',
    price: '1 490$'
  },
]

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
  
})
export class SliderComponent {
  @ViewChild('content') slider: ElementRef<HTMLElement>;

  cheen: ProductModel[] = items;

  constructor(
    public layoutService: LayoutService
  ) {}

  scroll(direction: string) {
    const sliderItems: HTMLCollection = this.slider.nativeElement.children;
    const sliderItemStyles: CSSStyleDeclaration = window.getComputedStyle(sliderItems[0]);
    const sliderItemLength = Number.parseFloat(sliderItemStyles.marginRight) + Number.parseFloat(sliderItemStyles.width);
    const sliderScrolled = this.slider.nativeElement.scrollLeft;
    const scrolledItemsNumber = Math.round(direction === 'right' ? sliderScrolled / sliderItemLength + 1 : sliderScrolled / sliderItemLength - 1);

    sliderItems[scrolledItemsNumber]?.scrollIntoView({ behavior: 'smooth', inline: 'start' }); // optional chaining for initial position
  }
}

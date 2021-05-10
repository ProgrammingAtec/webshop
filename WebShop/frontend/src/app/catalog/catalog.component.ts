import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

const categories = {
  men: {
    templateHeader: {
      header: 'Men',
      sections: ['New', 'Bestsellers', 'Suits', 'Shoes'],
      img: {
        path: 'assets/catalog-men.png',
        link: '#'
      }
    },

    templateBody: {
      slider: {},

      specials: [
        {
          img: 'assets/suits.jpg',
          link: '#'
        },
        {
          img: 'assets/woman_classic.jpeg',
          link: '#'
        },
        {
          img: 'assets/sport_kids.jpg',
          link: '#'
        },
      ],

      banner: {
        title: '20% off on third purchase',
        img: 'assets/sakura_bg.png'
      },

      preparedFilters: [],
    },

    templateFooter: [
      ['Gentlmen', 'Shoes', 'Bags', 'Socks', 'Ties', 'Jackets'],
      ['Season', 'Coats', 'Hats', 'Bestsellers', 'Umbrella'],
      ['Sport', 'Sneakers', 'T-Shirts', 'Shorts', 'Pullovers', 'Hoodies'],
      ['Teenager', 'Modern', 'New', 'Jewerly', 'Celebrities\' choice', 'Watches']
    ]
  },

  women: {
    templateHeader: {
      header: 'Women',
      sections: ['New', 'Bestsellers', 'Suits', 'Shoes'],
      img: {
        path: 'assets/catalog-men.png',
        link: '#'
      }
    },

    templateBody: {
      slider: {},

      specials: [
        {
          img: 'assets/suits.jpg',
          link: '#'
        },
        {
          img: 'assets/woman_classic.jpeg',
          link: '#'
        },
        {
          img: 'assets/sport_kids.jpg',
          link: '#'
        },
      ],

      banner: {
        title: 'Third with 20% off',
        img: 'assets/sakura_bg.png'
      },

      preparedFilters: [],
    },

    templateFooter: [
      ['Gentlmen', 'Shoes', 'Bags', 'Socks', 'Ties', 'Jackets'],
      ['Season', 'Coats', 'Hats', 'Bestsellers', 'Umbrella'],
      ['Sport', 'Sneakers', 'T-Shirts', 'Shorts', 'Pullovers', 'Hoodies'],
      ['Teenager', 'Modern', 'New', 'Jewerly', 'Celebrities\' choice', 'Watches']
    ]
  },

  kids: {
    templateHeader: {
      header: 'Kids',
      sections: ['New', 'Bestsellers', 'Suits', 'Shoes'],
      img: {
        path: 'assets/catalog-men.png',
        link: '#'
      }
    },

    templateBody: {
      slider: {},

      specials: [
        {
          img: 'assets/suits.jpg',
          link: '#'
        },
        {
          img: 'assets/woman_classic.jpeg',
          link: '#'
        },
        {
          img: 'assets/sport_kids.jpg',
          link: '#'
        },
      ],

      banner: {
        title: 'Third with 20% off',
        img: 'assets/sakura_bg.png'
      },

      preparedFilters: [],
    },

    templateFooter: [
      ['Gentlmen', 'Shoes', 'Bags', 'Socks', 'Ties', 'Jackets'],
      ['Season', 'Coats', 'Hats', 'Bestsellers', 'Umbrella'],
      ['Sport', 'Sneakers', 'T-Shirts', 'Shorts', 'Pullovers', 'Hoodies'],
      ['Teenager', 'Modern', 'New', 'Jewerly', 'Celebrities\' choice', 'Watches']
    ]
  }
}

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

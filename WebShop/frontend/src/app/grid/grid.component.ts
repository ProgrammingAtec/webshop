import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LayoutService } from '../shared/services/layout.service';
import { filtersMock, goodsMock } from './grid.mock';

export type Filter = {
  group: string,
  type: 'range',
  from: number,
  to: number
} | {
  group: string,
  type: 'value',
  value: string | number
};

export type FrontendFilter = Filter & { control: string };

export interface ShortGood {
  image: string,
  name: string,
  description: string,
  price: number
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('smoothOpen', [
      state('false', style({ height: '0' })),
      state('true', style({ height: '*' })),
      transition('true <=> false', animate('0.1s ease-in-out'))
    ])
  ]
})
export class GridComponent implements OnInit {
  public groupedFilters: FrontendFilter[][];
  public goods: ShortGood[] = [];
  public filtersForm: FormGroup;
  public showLoadingOverlay = false;
  public showDetailedFilters = false;
  public baseFilters: FrontendFilter[] = [];
  public detailedFilters: FrontendFilter[][] = [];

  private _originalFilters: Filter[];
  private _subscriptions: Subscription[] = [];

  public constructor(
    public readonly layout: LayoutService,
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getAllFilters();
    this.getAllGoods();
    this.groupFilters();
    this.determineFiltersAsControls();
    this.subsFilterControlChanges();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public filtersGroupToggle(iconRef: HTMLElement, bodyRef: HTMLElement): void {
    iconRef.classList.toggle('opened');
    bodyRef.classList.toggle('opened');
  }

  public showDetailedFiltersToggle(): void {
    this.showDetailedFilters = !this.showDetailedFilters;
  }

  private groupFilters() {
    const groupsOrder = ['clothes', 'gender', 'price', 'brand', 'size'];
    const groupedFilters = [];
    groupsOrder.forEach(() => groupedFilters.push([]));

    for (const filter of this._originalFilters) {
      for (let i = 0; i < groupsOrder.length; i++) {
        if (groupsOrder[i] !== filter.group) continue;

        groupedFilters[i].push(Object.assign(filter, { control: this.getFilterValueAsString(filter)}));
      }
    }

    this.groupedFilters = groupedFilters;
   }

   private getAllFilters(): void {
    this._originalFilters = filtersMock; // recieve through Htpp Get Request
   }

   private getAllGoods(): void {
     this.goods = goodsMock; // recieve through Htpp Get Request
   }

   private determineFiltersAsControls(): void {
    const controlsForBuilder: { [key: string]: any } = {};
    this.groupedFilters.flat().forEach(filter => controlsForBuilder[filter.control] = [false]);
    this.filtersForm = this.fb.group(controlsForBuilder);
    this.baseFilters = this.groupedFilters[0];
    this.detailedFilters = this.groupedFilters.slice(1);
  }

   private subsFilterControlChanges(): void {
    this._subscriptions.push(this.filtersForm.valueChanges.pipe(
      switchMap(filterControls => {
        // this.http.get('pathToGetShortFilteredGoods', { params: filterControls }) // uncomment when backend is ready
        this.showLoadingOverlay = true;
        this.cd.markForCheck();
        return timer(1000);
      })
    ).subscribe(() => this.emitateGoodsRequest()));
   }

   private getFilterValueAsString(filter: Filter): string {
    return filter.type === 'range' ? `${filter.from}-${filter.to}` : `${filter.value}`
   }

   private emitateGoodsRequest(): void {
    this.showLoadingOverlay = false;
    this.cd.markForCheck();
   }
}

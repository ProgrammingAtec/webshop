import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public groupedFilters: FrontendFilter[][];
  public goods: ShortGood[] = [];
  public filtersForm: FormGroup;
  public showLoadingOverlay = false;

  private _originalFilters: Filter[];
  private _subscriptions: Subscription[] = [];

  public constructor(
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

  private groupFilters() {
    const groupsOrder = ['clothes', 'gender', 'price'];
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
     this.goods = goodsMock;
   }

   private determineFiltersAsControls(): void {
    const controls: { [key: string]: any } = {};
    this.groupedFilters.flat().forEach(filter => controls[filter.control] = [false]);

    this.filtersForm = this.fb.group(controls);
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

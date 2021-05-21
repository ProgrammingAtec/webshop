import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent implements OnInit, OnDestroy {
  public headLong;
  public headOffset;
  
  private _isHidden = false;

  @Input() public scrollElement;

  @Input() public isHorizontalScroll = false;

  @HostBinding('class.hidden') public get isHidden() {
    return this._isHidden;
  }

  ngOnInit(): void {
    setTimeout(() => { // angular changeDetector binding issue
      this.subcOnScroll();
      this.defineHeadLong();
    });
  }

  ngOnDestroy(): void {
    this.scrollElement.removeEventListener('scroll', this.scrollListener);
  }

  private defineHeadLong(): void {
    this.headLong = this.isHorizontalScroll ? this.scrollElement.clientWidth / (this.scrollElement.scrollWidth / 100) :
      this.scrollElement.clientHeight / (this.scrollElement.scrollHeight / 100);

    this._isHidden = this.headLong === 100;
  }

  private subcOnScroll(): void {
    this.scrollElement.addEventListener('scroll', () => this.scrollListener())
  }

  private scrollListener(): void {
    this.headOffset = this.isHorizontalScroll ?
        this.scrollElement.scrollLeft / (this.scrollElement.scrollWidth / 100) :
        this.scrollElement.scrollTop / (this.scrollElement.scrollHeight / 100);
  }
}

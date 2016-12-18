import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  template: `
      <ion-grid>
        <ion-row>          
          <ion-col>
          <button   ion-button full
          [disabled]="!isNextPage" 
           (click)="onNextPageClick($event);">Next</button>
          </ion-col>
        </ion-row>
      </ion-grid>
  `
})
export class PagerComponent { 
  @Input() totalItems: number;
  @Input() itemPerPage: number = 5;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  private currentPage: number = 1;

  private get isPrevPage(): boolean {
    return 1 < this.currentPage;
  }

  private get isNextPage(): boolean { 
    return this.currentPage < this.totalItems;
  }

  private onPrevPageClick() { 
    --this.currentPage;
    this.onPageChange.next((this.currentPage - 1) * this.itemPerPage);
  }

  private onNextPageClick() { 
    ++this.currentPage;
    this.onPageChange.next((this.currentPage - 1) * this.itemPerPage);
  }
}
import { Component, Input, Output, EventEmitter, ElementRef, QueryList, ContentChildren } from '@angular/core';

export interface CourselItem {
  description: string;
  imgUrl?: string;
  color?: string
}

interface SlideItem {
  idx: number;
  description: string;
  imgUrl: string;
  color?: string;
  currentPlacement: number
}


@Component({
  selector: 'carousel',
  template: `
    <div class="carousel-container">
      <div class="carousel">
        <div radio-group class="carousel-slide-item" 
        *ngFor="let item of items"
        [style.background-color]="item.color" 
        [ngStyle]="{'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)', '-ms-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)', 
        '-o-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+tz+'px)'}"
        (swipeleft)="onSwipeLeft($event);"
        (swiperight)="onSwipeRight($event);"
        >
          <img src="{{item.imgUrl}}" style="width:200px;height:200px;margin-top: 10px;" />
          <p>{{item.description}}</p>
          <ion-checkbox [(ngModel)]="item.isSelected" (click)="selectItem(item)" ></ion-checkbox>
        </div>
      </div>
    </div>
  `
})
export class CarouselComponent {
  private currentDeg: number = 0;
  private items: Array<SlideItem> = [];
  private containerWidth: number = 250;
  private tz: number;

  @Input() set slides(values: Array<CourselItem>) {
    if (!values.length) return;

    let degree: number = 0;
    this.tz = 250;//Math.round((this.containerWidth / 2) /
      //Math.tan(Math.PI / values.length));
    this.items = <Array<SlideItem>>values.map((item: CourselItem, index: number) => {
      let slideItem = {
        idx: index,
        description: item.description,
        imgUrl: item.imgUrl,
        color: item.color,
        currentPlacement: degree
      };
      degree = degree + 60;
      return slideItem;
    })
  }

  @Output() selectSlide = new EventEmitter();

  constructor(private eleRef: ElementRef) {
   }

  onSwipeLeft() {
    this.currentDeg = this.currentDeg - 60;
    this.applyStyle();
  }

  onSwipeRight() {
    this.currentDeg = this.currentDeg + 60;
    this.applyStyle();
  }

  private applyStyle() {
    let ele = this.eleRef.nativeElement.querySelector('.carousel');
    ele.style[ '-webkit-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-moz-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ '-o-transform' ] = "rotateY(" + this.currentDeg + "deg)";
    ele.style[ 'transform' ] = "rotateY(" + this.currentDeg + "deg)";
  }

  selectItem(item:any){
    this.selectSlide.emit(item);
  }
} 
import { Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef } from '@angular/core';

import { CORE_DIRECTIVES, FORM_PROVIDERS } from '@angular/common';

import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel, FORM_DIRECTIVES }from '@angular/forms';

const NO_OP = () => {
};

@Component({
  selector: 'rating',
  templateUrl: 'build/shared/rating/rating.component.html',
  directives : [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR, 
      useExisting : forwardRef(() => RatingComponent),
      multi : true
    },
    FORM_PROVIDERS
  ]
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Input() ratingValue : number;
  @Input() onState: string = 'ion-ios-star ion-android-star';
  @Input() offState: string = 'ion-ios-star-outline ion-android-star-outline';
  @Input() readonly: boolean = false;
  @Input() max: number = 5;

  @Output() private ratingValueChange : EventEmitter<number> = new EventEmitter<number>();

  private range: Array<any>;
  private value: number;
  private initialValue: number;

  private onTouchedCallback: () => void = NO_OP;
  private onChangeCallback: (_: any) => void = NO_OP;

  @HostListener('keydown', [ '$event' ])
  // allowing support of arrow movement.  
  private onKeydown(event: KeyboardEvent) {
    if ([ 37, 38, 39, 40 ].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    // if upper / right arrow is pressed then increment value by 1.
    let sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.setRating(this.value + sign);
  }

  ngOnInit() {
    this.value = this.ratingValue || 0;
    this.range = this.buildRatingObject();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(value: number) {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.initialValue = value;
      this.ratingValue = value;
      return;
    }

    this.initialValue = value;
    this.value = value;
    this.ratingValue = value;
  }

  // This prepare object to render the sets of star
  private buildRatingObject() {
    let result: any[] = [];
    for (let i = 0; i < this.max; i++) {
      result.push(
        {
          index: i,
          onState: this.onState,
          offState: this.offState
        }
      )
    }

    return result;
  }

  private setRating(value: number) {
    if (!this.readonly && value > 0) {
    // update view and annouce the changes to angular
      this.writeValue(value);
      this.ratingValueChange.next(value);
    }
  }
}
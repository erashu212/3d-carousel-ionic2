import {
  describe, expect, it, xit, inject, beforeEach, beforeEachProviders,
  setBaseTestProviders, async, resetBaseTestProviders
}  from '@angular/core/testing';

import {
  TestComponentBuilder, ComponentFixture
} from '@angular/compiler/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';

import 'zone.js/dist/async-test';

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

import { RatingComponent } from './rating.component';

declare const jasmine: any;

describe('Component: RatingComponent', () => {

  // rc4 has some breaking changes which does not work with component is having templateUrl.
  let tempate = `
        <span (keydown)="onKeydown($event)" tabindex="0" role="slider"       aria-valuemin="0" 
        [attr.aria-valuemax]="range.length" 
        [attr.aria-valuenow]="value">
          <span *ngFor=" let rating of range; let idx = index;" class="active">
            <ion-icon
            class="fa" (click)="setRating(idx + 1)" 
            [ngClass]="idx < value ? rating.onState : rating.offState"></ion-icon>
          </span>
        </span>
        `;

  it('initially should be defined ', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(RatingComponent, tempate)
      .createAsync(RatingComponent).then((fixture) => {
        let ci = fixture.componentInstance;
        expect(ci).toBeDefined();
      });
  })));

  it('it should not set the value if no initial value. ', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(RatingComponent, tempate)
      .createAsync(RatingComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;

        ci.ratingValue = 0;
        fixture.detectChanges();

        let stars = el.querySelectorAll('.ion-ios-star');
        expect(stars.length).toEqual(0);
      });
  })));

  it('it should set the value', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(RatingComponent, tempate)
      .createAsync(RatingComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;

        ci.ratingValue = 5;
        fixture.detectChanges();

        let stars = el.querySelectorAll('.ion-ios-star');
        expect(stars.length).toEqual(5);
      });
  })));

  it('it should set the selected value', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(RatingComponent, tempate)
      .createAsync(RatingComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;

        fixture.detectChanges();

        let stars = el.querySelectorAll('ion-icon');
        stars[ 0 ].click();
        fixture.detectChanges();

        expect(ci.ratingValue).toEqual(1);
        
        stars[ 1 ].click();
        fixture.detectChanges();

        expect(ci.ratingValue).toEqual(2);
      });
  })));
});
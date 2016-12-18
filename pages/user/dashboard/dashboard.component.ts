import { Component } from '@angular/core';

import { NavController, Tab } from 'ionic-angular';

import { CarouselComponent } from '../../../shared/carousel'


@Component({
  templateUrl: 'build/pages/user/dashboard/dashboard.component.html',
  directives: [ CarouselComponent ]
})
export class DashboardComponent {
}


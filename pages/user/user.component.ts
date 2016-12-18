import { Component, Type } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';


import { DashboardComponent} from './dashboard'

import { AccountComponent } from './account'

@Component({
  templateUrl: 'build/pages/user/user.component.html'
})
export class UserComponent {
  dashboardPage: Type = DashboardComponent;
  accountPage: Type = AccountComponent;
}


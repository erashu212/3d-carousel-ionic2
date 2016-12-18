import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { UserService } from "../../shared/shared/user/user.service";
import { ProducerComponent } from "../producer";
import { StartComponent } from "../start";
import { LoginComponent } from '../login'

import { ProfileComponent } from "../../shared"

@Component({
  templateUrl: 'build/pages/thanks/thanks.component.html',
  directives: [ ProfileComponent ]
})
export class ThanksComponent {
  private isDirectLandToPage: boolean = false;
  private url: string = "http://tr3.cbsistatic.com/fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";

  constructor(
    private navCtrl: NavController,
    private params: NavParams
  ) {
    this.isDirectLandToPage = this.params.get('directPage')
  }

  private gotoPreviousScreen() {
    this.navCtrl.setRoot(this.isDirectLandToPage ? StartComponent : ProducerComponent);
  }

  private gotoLogin() {
    this.navCtrl.setRoot(LoginComponent);
  }
}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { UserService } from "../../shared/shared/user/user.service";
import { ProducerComponent } from "../producer";
import { ThanksComponent } from "../thanks";
import { LoginComponent } from "../login";

@Component({
  templateUrl: 'build/pages/start/start.component.html'
})
export class StartComponent {
  constructor(private navCtrl: NavController) {}

  gotoProdcuer(){
    this.navCtrl.setRoot(ProducerComponent);
  }  

  gotoLogin(){
    this.navCtrl.setRoot(LoginComponent);
  } 

  gotoThanks(){
    this.navCtrl.setRoot(ThanksComponent, {
      directPage: true
    });
  }
}

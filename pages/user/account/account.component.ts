import { Component } from '@angular/core';

import { NavController, Tab } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

import { ProducerComponent } from '../../producer-info'

import { AccountSettingsComponent } from '../../account-settings'

import { PolicyComponent } from '../../policy'

import { TermComponent } from '../../terms'

import { LoginComponent } from '../../login'

import {App} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/user/account/account.component.html'
})
export class AccountComponent {

  constructor(
    private navCtrl: NavController,
    private app: App
  ) {
  }

  openNavAccountPage() {
    this.navCtrl.push(AccountSettingsComponent);
  }

  openNavProducerPage() {
    this.navCtrl.push(ProducerComponent);
  }

  openNavGetHelpPage() {
    this.navCtrl.push(ProducerComponent);
  }

  openNavTermsPage() {
    this.navCtrl.push(TermComponent);
  }

  openNavPrivacyPage() {
    this.navCtrl.push(PolicyComponent);
  }

  logout(){
    this.app.getRootNav().setRoot(LoginComponent);
  }

}


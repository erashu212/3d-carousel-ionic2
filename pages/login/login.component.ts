import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NavController } from 'ionic-angular';
import { SpinnerDialog } from 'ionic-native';

import { UserComponent } from "../user/user.component";
import { CognitoService } from "../../shared/aws";
import { StartComponent } from "../start";

@Component({
  templateUrl: 'build/pages/login/login.component.html'
})
export class LoginComponent {
  private errorMessage: string;
  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private cognitoService: CognitoService
  ) {
    this.initValidation();
  }

  private initValidation() {
    this.loginForm = this.fb.group({
      'username': [ '', Validators.required ],
      'password': [ '', Validators.required ]
    });
  }

  login() {
    this.errorMessage = '';
    this.showLoadingBar();

    let username: string = this.loginForm.controls[ 'username' ].value.trim();
    let password: string = this.loginForm.controls[ 'password' ].value.trim();

    this.cognitoService.loginUser(username.toLowerCase(), password)
      .then(res => {
        this.hideLoadingBar();
        this.navigateToDashboardPage();
      }).catch((errResp: any) => {
        this.hideLoadingBar();
        this.errorMessage = errResp.message;
      });
  }

  private showLoadingBar() {
    SpinnerDialog.show('Processing', 'Please wait..');
  }

  private hideLoadingBar() {
    SpinnerDialog.hide();
  }

  private navigateToDashboardPage() {
    this.navCtrl.setRoot(UserComponent)
  }

  private gotoHome() { 
    this.navCtrl.setRoot(StartComponent);
  }
}

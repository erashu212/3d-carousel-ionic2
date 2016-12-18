import { Component, ViewChild } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {
  ionicBootstrap, Platform, Nav, NavController, ModalController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { CognitoService } from "./shared/aws/cognito.service";
import { DynamoDBService } from "./shared/aws/dynamo.service";
import { ConfigProvider } from "./shared/aws/config";
import { UploaderService } from './shared/shared/uploader.service'

import { StartComponent } from './pages/start';

@Component({
  template: `
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private rootPage: any = StartComponent;

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

const PROVIDERS = [
  HTTP_PROVIDERS,
  disableDeprecatedForms(),
  provideForms(),
  DynamoDBService,
  CognitoService,
  ConfigProvider,
  UploaderService
];

ionicBootstrap(
  MyApp,
  PROVIDERS
);

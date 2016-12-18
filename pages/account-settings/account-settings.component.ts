import { Component, Type } from '@angular/core';

import { NavController, ActionSheetController, AlertController } from 'ionic-angular';
import { SpinnerDialog } from 'ionic-native';

import { ICompanyInformation, AccountSettingsService } from './shared'
import { UploaderService } from '../../shared/shared'

@Component({
  templateUrl: 'build/pages/account-settings/account-settings.component.html',
  providers: [ AccountSettingsService ]
})
export class AccountSettingsComponent {
  private message: string = '';
  private company: ICompanyInformation = {
    name: '',
    logo: ''
  };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private accountSvc: AccountSettingsService,
    private uploaderSvc: UploaderService,
    private alertCtrl: AlertController
  ) {
  }

  private presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'PhotoUpload',
      buttons: [
        {
          text: 'Upload',
          icon: 'cloud-upload',
          handler: () => {
            this.showLoadingBar();

            this.uploaderSvc.uploadImage().then((img: any) => {
              this.hideLoadingBar();
              this.company.logo = img;
            })
          }
        },
        {
          text: 'Image link/url',
          icon: 'attach',
          handler: (res) => {
            let prompt = window.prompt('http://');
            if (prompt != null) { 
              this.company.logo = prompt;
            }
          }
        }, {
          text: 'Delete Photo',
          role: 'destructive',
          icon: 'close-circle',
          handler: (res) => {
            this.showLoadingBar();

            this.accountSvc.deleteCompanyProfile(this.company)
              .then((res) => {
                this.company.logo = '';
                this.hideLoadingBar();
                this.message = 'Image has been deleted successfully!.'
                this.hideMessage();
              })
              .catch((errResp) => {
                this.hideLoadingBar();

                this.message = errResp;
                this.hideMessage();
              })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            actionSheet.dismiss();
          }
        }
      ]
    });

    actionSheet.present();
  }

  private save() {
    this.showLoadingBar();

    this.accountSvc.saveCompanyProfile(this.company)
      .then((res) => {
        this.hideLoadingBar();
        this.message = 'Information saved successfully!.'
        this.hideMessage();
      })
      .catch((errResp) => {
        this.hideLoadingBar();
        this.message = errResp;
        this.hideMessage();
      })
  }

  private showLoadingBar() {
    SpinnerDialog.show('Processing', 'Please wait..');
  }

  private hideLoadingBar() {
    SpinnerDialog.hide();
  }

  private hideMessage() {
    setTimeout(() => this.message = '', 2000);
  }
}
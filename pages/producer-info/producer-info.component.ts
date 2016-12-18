import { Component, Type } from '@angular/core';

import { NavController, ActionSheetController } from 'ionic-angular';
import { SpinnerDialog } from 'ionic-native';

import { ProducerInfoService, IProducerInfo } from './shared'

import { UploaderService } from '../../shared/shared'

@Component({
  templateUrl: 'build/pages/producer-info/producer-info.component.html',
  providers: [ ProducerInfoService ]
})
export class ProducerComponent {
  private message: string;
  private producers: Array<IProducerInfo> = [];
  private producer: IProducerInfo = {
    name: '',
    email: '',
    imageUrl: '',
    role: ''
  };

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private producerSvc: ProducerInfoService,
    private uploaderSvc: UploaderService
  ) {
  }

  ionViewWillEnter() {
    this.getProducers();
  }

  private getProducers() {
    this.showLoadingBar();

    this.producerSvc.getProducers()
      .then((res: Array<IProducerInfo>) => {
        this.hideLoadingBar();
        this.producers = res
      })
      .catch(res => {
        this.hideLoadingBar();
        this.producers = []
      });
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
              this.producer.imageUrl = img;
            }).catch(errResp => this.hideLoadingBar())
          }
        },
        {
          text: 'Image link/url',
          icon: 'attach',
          handler: (img) => {
            let prompt = window.prompt('http://');
            if (prompt != null) {
              this.producer.imageUrl = img;
            }
          }
        }, {
          text: 'Delete Photo',
          role: 'destructive',
          icon: 'close-circle',
          handler: (res) => {
            this.showLoadingBar();

            this.producerSvc.deleteImage(this.producer)
              .then(res => {
                this.message = 'Image has been deleted successfully.';
                this.getProducers();
                this.producer.imageUrl = '';

                this.hideLoadingBar();
                this.hideMessage();
              }).catch(errResp => {
                this.hideLoadingBar();

                this.message = 'Something went wrong!';
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

  private add() {
    this.showLoadingBar();

    this.producerSvc.saveProducer(this.producer).then((res: IProducerInfo) => {
      this.hideLoadingBar();

      this.message = 'Producer added successfully!.';
      this.producers.push(res);
      this.producer = {
        name: '',
        email: '',
        imageUrl: '',
        role: ''
      };
      this.hideMessage();
    }).catch(errResp => {
      this.hideLoadingBar();

      this.message = 'Something went wrong.';
      this.hideMessage();
    });
  }

  private edit(producer: IProducerInfo) {
    this.producer = Object.assign({
      name: '',
      email: '',
      imageUrl: '',
      role: ''
    }, producer);
  }

  private delete(producer: IProducerInfo) {
    this.showLoadingBar();

    this.producerSvc.deleteProducer(producer).then(res => {
      this.hideLoadingBar();

      this.message = 'Producer deleted successfully!.';
      this.hideMessage();
    }).catch(errResp => {
      this.hideLoadingBar();

      this.message = 'Something went wrong.';
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
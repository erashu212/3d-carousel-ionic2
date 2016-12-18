import { Injectable } from '@angular/core';

import { Camera } from 'ionic-native';

declare const window;

@Injectable()
export class UploaderService {
  constructor() {
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }).then((imageData) => {
        resolve("data:image/jpeg;base64," + imageData);
      }, (err) => {
        reject(err);
      });
    })
  }
}
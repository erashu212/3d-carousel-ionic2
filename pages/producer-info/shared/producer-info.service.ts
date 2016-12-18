import { Injectable } from '@angular/core';

import { Storage, LocalStorage } from 'ionic-angular';

declare const window: any;

export interface IProducerInfo {
  name: string;
  email: string;
  role: string;
  imageUrl: string;
}

@Injectable()
export class ProducerInfoService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage(LocalStorage);
  }

  getProducers() {
    return new Promise((resolve, reject) => {
      this.storage.getJson('producers').then(res => {
        resolve(res || []);
      }).catch(errResp => reject(errResp))
    })
  }

  saveProducer(producer: IProducerInfo) {
    let producers: Array<IProducerInfo> = [];
    return new Promise((resolve, reject) => {
      this.getProducers().then((data: any) => {
        producers = data || [];

        if (producer.name && producer.email) {
          let idx = producers.findIndex(item =>
            item.name == producer.name || item.email == producer.email);
          if (idx > -1) {
            producers[ idx ] = producer;
          } else {
            producers.push(producer);
          }
          this.storage.setJson('producers', producers);
          resolve(true);
        } else {
          reject('Missing information!.')
        }
      })
    })
  }

  deleteProducer(producer: IProducerInfo) {
    return new Promise((resolve, reject) => {
      this.getProducers().then((producers: Array<IProducerInfo>) => {
        if (producer.name && producer.email) {
          producers = producers.filter(item => item.name != producer.name);
          this.storage.setJson('producers', producers);
          resolve(true);
        } else {
          reject('Missing information!.')
        }
      })
    })
  }

  deleteImage(producer: IProducerInfo) {
    return new Promise((resolve, reject) => {
      if (producer.imageUrl && producer.email) {
        this.storage.remove('producers');
        resolve(true);
      } else {
        reject('Missing information!.')
      }
    })
  }
}
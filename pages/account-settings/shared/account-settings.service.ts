import { Injectable } from '@angular/core';

import { Storage, LocalStorage } from 'ionic-angular';

import * as schema from './schema';

declare const window: any;

export class AccountSettingsService {

  private storage: Storage;

  constructor() { 
    this.storage = new Storage(LocalStorage);
  }

  saveCompanyProfile(company: schema.ICompanyInformation) {
    return new Promise((resolve, reject) => {
      if (company.name /* && company.logo */) {
        this.storage.setJson('company', company);
        resolve(company);
      } else {
        reject('Information missing;')
      }
    });
  }
  
  deleteCompanyProfile(company: schema.ICompanyInformation) {
    return new Promise((resolve, reject) => {
      if (company.name && company.logo) {
        this.storage.remove('company');
        resolve(true);
      } else {
        reject('Can not be deleted;')
      }
    });
  }
}
import { beforeEachProviders, it, xit, describe, expect, inject } from '@angular/core/testing';

import { HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { provide } from '@angular/core';

import { Storage, LocalStorage } from 'ionic-angular';

import { IUser } from './user.schema';
import { UserService } from './user.service'

describe('Service: UserService', () => {
  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: MockBackend }),
    UserService,
  ]);

  it('should get a list of users', inject([ XHRBackend, UserService ], (mockBackend, userService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: [
            {
              id: 1,
              login: 'erashu212',
              avatar_url: 'NA'
            }
          ]
        })));
      }
    );

    userService.getUserData().subscribe((users: Array<IUser>) => {
      expect(users.length).toBe(1);
      expect(users[ 0 ].login).toBe('erashu212');
    })
  }));

  it('should not allow login with wrong credentials', inject([ UserService ], (userService) => {
    let mockModel = {
      username: 'test',
      password: 'test123'
    };
    userService.doLogin(mockModel.username, mockModel.password).then(res => { 
      expect(res).not.toBeDefined()
    }, (errRes) => { 
      expect(errRes).toBeDefined();
      expect(errRes).toBe('unkwown username/password.')
    });
  }));

  it('should allow login with correct credentials', inject([ UserService ], (userService) => {
    let mockModel = {
      username: 'demo',
      password: 'demo'
    };
    userService.doLogin(mockModel.username, mockModel.password).then(res => { 
      expect(res).toBeDefined();
      expect(res).toBe(true);
    }, (errRes) => { 
      expect(errRes).not.toBeDefined();
    });
  }));
  
  it('should allow user to logout', inject([ UserService ], (userService) => {
    userService.doLogout().then(res => { 
      expect(res).toBeDefined();
      //it means user session is destroyed
      expect(res).toBe(false);
    }, (errRes) => { 
      expect(errRes).not.toBeDefined();
    });
  }));
});

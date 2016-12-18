import { provide } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import {
  describe, expect, it, xit, inject, beforeEach, beforeEachProviders,
  setBaseTestProviders, async, resetBaseTestProviders
}  from '@angular/core/testing';
import {
  TestComponentBuilder, ComponentFixture
} from '@angular/compiler/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { NavController, LoadingController, LoadingOptions, Loading } from 'ionic-angular';

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

import { CognitoService, Config } from '../../shared/aws'

import { UserComponent } from '../user'

import { LoginComponent } from './login.component';

declare const jasmine: any, spyOn: any;

class NavControllerMock {
  setRoot(comp: any) {
    return true;
  }
}

class LoadingControllerMock {
  create(options?: LoadingOptions) {
    return new LoadingControllerMock();
  }

  present() {
    return true;
  }

  destroy() {
    return true;
  }
}

describe('Component: LoginComponent', () => {

  // rc4 has some breaking changes which does not work with component is having templateUrl.
  let tempate = `
  `;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms(),
    provide(NavController, { useClass: NavControllerMock }),
    provide(LoadingController, { useClass: LoadingControllerMock }),
    provide(Config, { useValue: Config }),
    provide(CognitoService, { useClass: CognitoService })
  ]);

  it('initially should be defined ', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let ci = fixture.componentInstance;
        expect(ci).toBeDefined();
      });
  })));

  it('should have empty form at initial.', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;
        fixture.detectChanges();

        expect(ci.username).not.toBeDefined();
        expect(ci.password).not.toBeDefined();
      });
  })));

  it('should show the "required" error message in the template', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;
        let loginForm = fixture.componentInstance.loginForm;
        fixture.detectChanges();

        ci.login();
        fixture.detectChanges();

        expect(loginForm.valid).toBe(false);
        expect(loginForm.find('username').getError('required')).not.toBeNull();
        expect(loginForm.find('password').getError('required')).not.toBeNull();
      });
  })));

  it('should call the login service on login', async(inject([ LoadingController, CognitoService, TestComponentBuilder ], (loadingCtrl, cognitoService, tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.debugElement.componentInstance;

        spyOn(cognitoService, 'loginUser').and.callThrough();
        ci.login();
        fixture.detectChanges();

        expect(cognitoService.loginUser).toHaveBeenCalled();
      });
  })));
});
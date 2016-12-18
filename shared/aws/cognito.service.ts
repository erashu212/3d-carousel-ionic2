import { Injectable, Inject }    from '@angular/core';
import { Config } from './config';

const AWS = (window as any).AWS;
const AmazonCognitoIdentity = (window as any).AmazonCognitoIdentity;

@Injectable()
export class CognitoService {
  public constructor( @Inject(Config) public config: any) {
  }

  public _AWS: any;

  public loginUser(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._getAccessToken(username, password).then((token) => {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: this.config.poolId,
          Logins: {
            [ 'cognito-idp.' + this.config.region + '.amazonaws.com/' + this.config.poolId ]: token
          }
        });
        this._AWS = AWS;
        resolve(true);
      }).catch(errResp => reject(errResp))
    });  
  }

  public getAWS(): any {
    return this._AWS;
  }

  public getUser(): any {
    let userPool = this._userPool();
    return userPool.getCurrentUser();
  }

  public signOut(): void {
    let user = this.getUser();
    user.signOut();
  }

  private _userPool(): any {
    var data = {
      UserPoolId: this.config.poolId,
      ClientId: this.config.clientId
    };
    return new AmazonCognitoIdentity.CognitoUserPool(data);
  }

  private _getAccessToken(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let authenticationData = {
        Username: username,
        Password: password,
      };
      let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

      let poolData = {
        UserPoolId: this.config.poolId,
        ClientId: this.config.clientId
      };
      let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      let userData = {
        Username: username,
        Pool: userPool
      };

      let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result: any): void => resolve(result.getAccessToken().getJwtToken()),
        onFailure: (err: any): void => reject(err)
      });
    });
  }

  public registerUser(data: any, cb: any): any {
    let poolData = {
      UserPoolId: this.config.poolId,
      ClientId: this.config.clientId
    };
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let attributeList: any[] = [];

    let dataEmail = {
      Name: 'email',
      Value: data.email
    };

    let dataPhoneNumber = {
      Name: 'phone_number',
      Value: data.phone
    };
    let attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    let attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp(data.username, data.password, attributeList, null, (err: any, result: any): any => {
      cb(err, result);
    });
  }

  public confirmUser(data: any, cb: any): any {
    let poolData = {
      UserPoolId: this.config.poolId,
      ClientId: this.config.clientId
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    let userData = {
      Username: data.username,
      Pool: userPool
    };

    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(data.code, true, (err: any, result: any): any => {
      cb(err, result);
    });
  }
}

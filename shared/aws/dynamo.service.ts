import { Injectable, Inject }    from '@angular/core';
import { Config } from './config';

@Injectable()
export class DynamoDBService {
  public constructor(@Inject(Config) public config:any) {
  }

  private _updateConfig(AWS:any):void {
    AWS.config.update({
      region: this.config.region,
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey,
    })
  }

  public getData(AWS:any, cb:any):any {
    this._updateConfig(AWS);
    let params = {
      TableName: this.config.tableName,
      ProjectionExpression: this.config.fields
    };
    let docClient = new AWS.DynamoDB.DocumentClient();
    docClient.scan(params, (err:any, data:any) => {
      cb(err, data);
    });
  }
}

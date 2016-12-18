import { OpaqueToken } from '@angular/core';
export const Config = new OpaqueToken('conf');

const _conf = {
  poolId: 'us-east-1_WRjTRJPkD',
  clientId: '51n4klaqkrmqrakfm8g4835u93',
  region: 'us-east-1',
  accessKeyId: 'AKIAJARCMQ66XFNQRWMQ',
  secretAccessKey: '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',
  //dynamoDb
  tableName: 'mdeval',
  fields: 'birthday_greeting, well_wisher_id, date_provided'
};
export const ConfigProvider = {provide: Config, useValue: _conf};

import { expect as expectCDK, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../lib/devio-stack';

test('Vpc', () => {
  const app = new cdk.App({
    context: {
      'systemName': 'starwars',
      'envType': 'prd'
    }
  });
  const stack = new Devio.DevioStack(app, 'DevioStack');

  expectCDK(stack).to(countResources('AWS::EC2::VPC', 1));
  expectCDK(stack).to(haveResource('AWS::EC2::VPC', {
    CidrBlock: '10.0.0.0/16',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-vpc' }]
  }));
});
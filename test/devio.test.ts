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

test('Subnet', () => {
  const app = new cdk.App({
    context: {
      'systemName': 'starwars',
      'envType': 'prd'
    }
  });
  const stack = new Devio.DevioStack(app, 'DevioStack');

  expectCDK(stack).to(countResources('AWS::EC2::Subnet', 6));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.11.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-public-1a' }]
  }));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.12.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-public-1c' }]
  }));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.21.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-app-1a' }]
  }));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.22.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-app-1c' }]
  }));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.31.0/24',
    AvailabilityZone: 'ap-northeast-1a',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-db-1a' }]
  }));
  expectCDK(stack).to(haveResource('AWS::EC2::Subnet', {
    CidrBlock: '10.0.32.0/24',
    AvailabilityZone: 'ap-northeast-1c',
    Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-db-1c' }]
  }));
})
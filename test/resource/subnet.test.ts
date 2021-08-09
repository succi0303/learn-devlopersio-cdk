import { expect, countResources, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Devio from '../../lib/devio-stack';

test('Subnet', () => {
	const app = new cdk.App({
	  context: {
	    'systemName': 'starwars',
	    'envType': 'prd'
	  }
	});
	const stack = new Devio.DevioStack(app, 'DevioStack');
      
	expect(stack).to(countResources('AWS::EC2::Subnet', 6));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.11.0/24',
	  AvailabilityZone: 'ap-northeast-1a',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-public-1a' }]
	}));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.12.0/24',
	  AvailabilityZone: 'ap-northeast-1c',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-public-1c' }]
	}));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.21.0/24',
	  AvailabilityZone: 'ap-northeast-1a',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-app-1a' }]
	}));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.22.0/24',
	  AvailabilityZone: 'ap-northeast-1c',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-app-1c' }]
	}));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.31.0/24',
	  AvailabilityZone: 'ap-northeast-1a',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-db-1a' }]
	}));
	expect(stack).to(haveResource('AWS::EC2::Subnet', {
	  CidrBlock: '10.0.32.0/24',
	  AvailabilityZone: 'ap-northeast-1c',
	  Tags: [{ 'Key': 'Name', 'Value': 'starwars-prd-subnet-db-1c' }]
	}));
      })
import * as cdk from '@aws-cdk/core';
import { Vpc } from './resource/vpc';
import { Subnet } from './resource/subnet';
import { InternetGateway } from './resource/internetGateway';
import { ElasticIp } from './resource/elasticIp';
export class DevioStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc();
    vpc.createResources(this);

    // Subnet
    const subnet = new Subnet(vpc.vpc);
    subnet.createResources(this);

    // Internet Gateway
    const internetGateway = new InternetGateway(vpc.vpc);
    internetGateway.createResources(this);

    // Elastic IP
    const elasticIp = new ElasticIp();
    elasticIp.createResources(this);
  }
}
import * as cdk from '@aws-cdk/core';
import { CfnNatGateway, CfnSubnet, CfnEIP } from '@aws-cdk/aws-ec2';
import { Resource } from './abstract/resource';

interface ResourceInfo {
  readonly id: string;
  readonly resourceName: string;
  readonly allocateionId: () => string;
  readonly subnetId: () => string;
  readonly assign: (natGateway: CfnNatGateway) => void;
}

export class NatGateway extends Resource {
  public ngw1a: CfnNatGateway;
  public ngw1c: CfnNatGateway;

  private readonly subnetPublic1a: CfnSubnet;
  private readonly subnetPublic1c: CfnSubnet;
  private readonly elasticIpNgw1a: CfnEIP;
  private readonly elasticIpNgw1c: CfnEIP;
  private readonly resourcesInfo: ResourceInfo[] = [
    {
      id: 'NatGateway1a',
      resourceName: 'ngw-1a',
      allocateionId: () => this.elasticIpNgw1a.attrAllocationId,
      subnetId: () => this.subnetPublic1a.ref,
      assign: natGateway => this.ngw1a = natGateway
    },
    {
      id: 'NatGateway1c',
      resourceName: 'ngw-1c',
      allocateionId: () => this.elasticIpNgw1c.attrAllocationId,
      subnetId: () => this.subnetPublic1c.ref,
      assign: natGateway => this.ngw1c = natGateway
    }
  ];

  constructor(
    subnetPublic1a: CfnSubnet,
    subnetPublic1c: CfnSubnet,
    elasticIpNgw1a: CfnEIP,
    elasticIpNgw1c: CfnEIP
  ) {
    super();
    this.subnetPublic1a = subnetPublic1a;
    this.subnetPublic1c = subnetPublic1c;
    this.elasticIpNgw1a = elasticIpNgw1a;
    this.elasticIpNgw1c = elasticIpNgw1c;
  };

  createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resourcesInfo) {
      const natGateway = this.createNatGateway(scope, resourceInfo);
      resourceInfo.assign(natGateway);
    }
  }

  private createNatGateway(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnNatGateway {
    const natGateway = new CfnNatGateway(scope, resourceInfo.id, {
      allocationId: resourceInfo.allocateionId(),
      subnetId: resourceInfo.subnetId(),
      tags: [{
        key: 'Name',
        value: this.createResourceName(scope, resourceInfo.resourceName)
      }]
    });

    return natGateway;
  }
}
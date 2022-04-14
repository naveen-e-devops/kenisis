import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as eks from 'aws-cdk-lib/aws-eks';
import { Construct } from 'constructs';

export class VpcStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc | ec2.IVpc;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const VpcName = 'Vpcstack/Vpc';


    // pcenter VPC is ONLY deployed in us-west-2 on both accounts
    const pcenter = this.region === 'ap-south-1';
    if (pcenter) {
      this.vpc = ec2.Vpc.fromLookup(this, 'pcenterVpc', {
        vpcName: VpcName,
      });
    } else {
        this.vpc = new ec2.Vpc(this, 'Vpc', {
        // To avoid cross AZ traffic costs. Put a NatGateway/EIP in each AZ
        natGateways: 2,
        maxAzs: 2,
        subnetConfiguration: [
          {
            name: 'Public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            name: 'Private',
            subnetType: ec2.SubnetType.PRIVATE,
          },
        ],
      });
  }
}
}
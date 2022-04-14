import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { VpcStack} from './vpc';
import { account } from './accounts'

export class k8sCdkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc | ec2.IVpc;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //const VpcName = 'Vpcstack/Vpc';
    //const isDefault = this.account === 'ap-south-1';
    
    //const DefaultVpc = ec2.Vpc.fromLookup(this, 'Vpcstack', {
     // vpcName: VpcName,
    //});

    // creating iam role for cluster
    const EksRole = new iam.Role(this, 'EksRole', {
        roleName: 'tpci-aws-eks-role',
        assumedBy: new iam.ServicePrincipal('eks.amazonaws.com'),
        managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy'),
        ],
    });


    // Creating kubernetes cluster
    const Ekscluster = new eks.FargateCluster(this, 'Ekscluster', {
        //vpc: DefaultVpc
        vpcSubnets: [{ 
          subnetType: 
          ec2.SubnetType.PRIVATE,
        }],
        version: eks.KubernetesVersion.V1_18,
        clusterName: 'tpci-eks-cluster',
        role: EksRole,
        endpointAccess: eks.EndpointAccess.PUBLIC,
    });

    Ekscluster.addNodegroupCapacity('eks-node-grop',{
      instanceTypes: [new ec2.InstanceType('t2.micro')],
      minSize: 1,
      diskSize: 20,    
    });
  } 
}

import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam'
import { Construct } from 'constructs';

export class KinesisCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creating IAM role for kinesis
    const kinesisRole =  new iam.Role(this,'KinesisRole', {
      roleName: 'sumologic',
      assumedBy: new iam.AccountPrincipal('926226587429'),
      externalIds: ['000000000000DE5E'],
      inlinePolicies: {
        SumoLogicRole: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                's3:AbortMultipartUpload',
                's3:GetObjectVersion',
                's3:GetObject',
                's3:ListBucket',
                's3:ListBucketMultipartUploads',
                's3:PutObject'
             ],
             resources: ['arn:aws:s3:::aws-waf-logs-streamdata-*']
            }),
          ],
        })
      },
    }).roleArn;

    // The code that defines your stack goes here
  }
}

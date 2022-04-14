#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { KinesisCdkStack } from '../lib/kinesis-cdk-stack';
import { k8sCdkStack } from '../lib/k8s-cdk-stack';
import {VpcStack} from '../lib/vpc';

 const region = 'us-east-1';

 const account = '814445629751';

const app = new cdk.App();
new KinesisCdkStack(app, 'KinesisCdkStack');
new k8sCdkStack (app, 'k8sCdkStack',{
    env: { 
        account, 
        region
    }
});
new VpcStack (app,'Vpcstack' );

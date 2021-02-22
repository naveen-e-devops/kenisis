#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { KinesisCdkStack } from '../lib/kinesis-cdk-stack';

const app = new cdk.App();
new KinesisCdkStack(app, 'KinesisCdkStack');

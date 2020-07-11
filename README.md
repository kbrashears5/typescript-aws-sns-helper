<h1 align="center">typescript-aws-sns-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS SNS service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-sns-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=12&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/12)](https://img.shields.io/azure-devops/tests/kbrashears5/github/12)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/12)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/12)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-sns-helper)](https://img.shields.io/npm/v/typescript-aws-sns-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-sns-helper)](https://img.shields.io/npm/dt/typescript-aws-sns-helper)
</div>

## Install
```
npm install typescript-aws-sns-helper@latest
```

## Usage
### Default - running in Lambda in your own account
```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new SNSHelper(logger);

const response = await helper.PublishAsync('topic',
    'subject',
    'message');
```

### Running in separate account or not in Lambda
```typescript
const logger = new Logger(LogLevel.Trace);

const options: AWS.SNS.ClientConfiguration = {
    accessKeyId: '{access_key}',
    secretAccessKey: '{secret_key}',
    region: 'us-east-1',
};

const repository = new AWS.SNS(options);

const helper = new SNSHelper(logger,
    repository);

const response = await helper.PublishAsync('topic',
    'subject',
    'message');
```
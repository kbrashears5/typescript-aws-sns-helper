<h1 align="center">typescript-aws-sns-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS SNS service</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-sns-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-sns-helper/branch/master/graph/badge.svg?token=EAGFPWYZB0)](https://codecov.io/gh/kbrashears5/typescript-aws-sns-helper)
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

const response = await helper.PublishAsync('topic', 'subject', 'message');
```

### Running in separate account or not in Lambda

```typescript
import * as SNS from '@aws-sdk/client-sns';

const logger = new Logger(LogLevel.Trace);

const options: SNS.SNSClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new SNS.SNS(options);

const helper = new SNSHelper(logger, repository);

const response = await helper.PublishAsync('topic', 'subject', 'message');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks

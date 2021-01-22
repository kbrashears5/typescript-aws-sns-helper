import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { SNSHelper } from './helper';
import * as SNS from '@aws-sdk/client-sns';

const publishResponseResponse: SNS.PublishResponse = {};

const publish = jest.fn().mockImplementation(() => {
    return Promise.resolve<SNS.PublishResponse>(publishResponseResponse);
});

// mock the functions
jest.mock('@aws-sdk/client-sns', () => {
    return {
        SNS: jest.fn().mockImplementation(() => {
            return {
                publish,
            };
        }),
    };
});

const logger = new Logger(LogLevel.Off);
const snsHelperMock = new SNSHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the PublishAsync method
 */
describe(`${SNSHelper.name}.${snsHelperMock.PublishAsync.name}`, () => {
    // set action for this method
    const action = `${SNSHelper.name}.${snsHelperMock.PublishAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} topicArn`, () => {
        const actual = snsHelperMock.PublishAsync(TestValues.EmptyString, TestValues.Subject, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} topicArn`);
    });
    test(`${TestValues.ThrowsOnEmpty} subject`, () => {
        const actual = snsHelperMock.PublishAsync(TestValues.Arn, TestValues.EmptyString, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} subject`);
    });
    test(`${TestValues.ThrowsOnEmpty} message`, () => {
        const actual = snsHelperMock.PublishAsync(TestValues.Arn, TestValues.Subject, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} message`);
    });
    test(TestValues.ValidTest, () => {
        const actual = snsHelperMock.PublishAsync(TestValues.Arn, TestValues.Subject, TestValues.Body);
        return expect(actual).resolves.toEqual(publishResponseResponse);
    });
});

import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { SNSHelper } from './helper';

const error = new Error(`AWS Error`);

const publish = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
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
    test(TestValues.InvalidTest, () => {
        const actual = snsHelperMock.PublishAsync(TestValues.Arn, TestValues.Subject, TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

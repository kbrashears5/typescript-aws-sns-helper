import { BaseMock } from 'typescript-helper-functions';
import * as SNS from '@aws-sdk/client-sns';


/**
 * SNS Mock class
 */
export class SNSMock extends BaseMock {

    /**
     * Mocks an SNS.PublishResponse response
     */
    public PublishResponse: SNS.PublishResponse = {};

    /**
     * Create the SNS mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // publish response
            publish: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SNS.PublishResponse>(this.PublishResponse);
                }),
            },
        };

        const options = {} as SNS.SNSClientConfig;

        // create the functions
        let functions = new SNS.SNS(options);
        functions = {
            publish: () => awsResponses.publish,
        };

        return functions;
    }
}

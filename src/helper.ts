import * as SNS from '@aws-sdk/client-sns';
import { ILogger } from 'typescript-ilogger';
import { ISNSHelper } from './interface';
import { BaseClass } from 'typescript-helper-functions';
import { MessageAttributeValue } from './any';

/**
 * SNS Helper
 */
export class SNSHelper extends BaseClass implements ISNSHelper {

    /**
     * AWS Repository for SNS
     */
    public Repository: SNS.SNS;

    /**
     * Initializes new instance of SNSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {SNS.SNS} Injected Repository. A new repository will be created if not supplied
     * @param options {SNS.SNSClientConfig} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: SNS.SNS,
        options?: SNS.SNSClientConfig) {

        super(logger);
        options = this.ObjectOperations.IsNullOrEmpty(options) ? { region: 'us-east-1' } as SNS.SNSClientConfig : options!;
        this.Repository = repository || new SNS.SNS(options);
    }

    /**
     * Publish a message
     * @param topicArn {string} Topic ARN to publish to
     * @param subject {string} Subject of message to send
     * @param message {string} Contents of message to send
     * @param messageAttributes {MessageAttributeValue} Attributes to give the message to send
     */
    public async PublishAsync(topicArn: string,
        subject: string,
        message: string,
        messageAttributes?: MessageAttributeValue): Promise<SNS.PublishResponse> {

        const action = `${SNSHelper.name}.${this.PublishAsync.name}`;
        this.LogHelper.LogInputs(action, { topicArn, subject, message, messageAttributes });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(topicArn)) { throw new Error(`[${action}]-Must supply topicArn`); }
        if (this.ObjectOperations.IsNullOrWhitespace(subject)) { throw new Error(`[${action}]-Must supply subject`); }
        if (this.ObjectOperations.IsNullOrWhitespace(message)) { throw new Error(`[${action}]-Must supply message`); }

        // create params object
        const params: SNS.PublishInput = {
            Message: message,
            MessageAttributes: messageAttributes,
            Subject: subject,
            TopicArn: topicArn,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.publish(params);
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}

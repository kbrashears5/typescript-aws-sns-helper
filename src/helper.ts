import * as AWS from 'aws-sdk';
import { ILogger } from 'typescript-ilogger';
import { ISNSHelper } from './interface';
import { BaseClass } from 'typescript-helper-functions';

/**
 * SNS Helper
 */
export class SNSHelper extends BaseClass implements ISNSHelper {

    /**
     * AWS Repository for SNS
     */
    public Repository: AWS.SNS;

    /**
     * Initializes new instance of SNSHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.SNS} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.SNS.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.SNS,
        options?: AWS.SNS.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.SNS(options);
    }

    /**
     * Publish a message
     * @param topicArn {string} Topic ARN to publish to
     * @param subject {string} Subject of message to send
     * @param message {string} Contents of message to send
     * @param messageAttributes {AWS.SNS.MessageAttributeMap} Attributes to give the message to send
     */
    public async PublishAsync(topicArn: string,
        subject: string,
        message: string,
        messageAttributes?: AWS.SNS.MessageAttributeMap): Promise<AWS.SNS.PublishResponse> {

        const action = `${SNSHelper.name}.${this.PublishAsync.name}`;
        this.LogHelper.LogInputs(action, { topicArn, subject, message, messageAttributes });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(topicArn)) { throw new Error(`[${action}]-Must supply topicArn`); }
        if (this.ObjectOperations.IsNullOrWhitespace(subject)) { throw new Error(`[${action}]-Must supply subject`); }
        if (this.ObjectOperations.IsNullOrWhitespace(message)) { throw new Error(`[${action}]-Must supply message`); }

        // create params object
        const params: AWS.SNS.PublishInput = {
            Message: message,
            MessageAttributes: messageAttributes,
            Subject: subject,
            TopicArn: topicArn,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.publish(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
/**
 * SNS Helper
 */
export interface ISNSHelper {

    /**
     * AWS Repository for SNS
     */
    Repository: AWS.SNS;

    /**
     * Publish a message
     * @param topicArn {string} Topic ARN to publish to
     * @param subject {string} Subject of message to send
     * @param message {string} Contents of message to send
     * @param messageAttributes {AWS.SNS.MessageAttributeMap} Attributes to give the message to send
     */
    PublishAsync(topicArn: string,
        subject: string,
        message: string,
        messageAttributes?: AWS.SNS.MessageAttributeMap): Promise<AWS.SNS.PublishResponse>;
}

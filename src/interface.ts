/* eslint-disable no-unused-vars */
import { MessageAttributeValue } from './any';
import * as SNS from '@aws-sdk/client-sns';

/**
 * SNS Helper
 */
export interface ISNSHelper {
  /**
   * Publish a message
   * @param topicArn {string} Topic ARN to publish to
   * @param subject {string} Subject of message to send
   * @param message {string} Contents of message to send
   * @param messageAttributes {MessageAttributeValue} Attributes to give the message to send
   */
  PublishAsync(
    topicArn: string,
    subject: string,
    message: string,
    messageAttributes?: MessageAttributeValue,
  ): Promise<SNS.PublishResponse>;
}

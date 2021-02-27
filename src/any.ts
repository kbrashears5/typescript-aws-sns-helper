import * as SNS from '@aws-sdk/client-sns';

/**
 * Represents SNS map
 */
export interface MessageAttributeValue {
  [key: string]: SNS.MessageAttributeValue;
}

import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response";

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            sectionId: event.pathParameters.id
        }
    };
    try {
        await dynamoDbLib.call("delete", params);
        return success({ status: true });
    } catch (error) {
        return failure({ status: false });
    }
}
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, QueryCommand } from "@aws-sdk/lib-dynamodb";

export const getGameData = (gameId) => {
    const client = new DynamoDBClient({endpoint: 'http://localhost:8000'});
    const documentClient = DynamoDBDocument.from(client)
    const queryCommand = new QueryCommand(
      { 
        TableName: 'Games', 
        KeyConditionExpression: 'gameId = :gameId',
        ExpressionAttributeValues: { ':gameId': gameId }
      }
    )
  
    return documentClient.send(queryCommand)
  }
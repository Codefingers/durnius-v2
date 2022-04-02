import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, PutCommand } from "@aws-sdk/lib-dynamodb";
import { GameData } from "./types";

export const updateGameData = (gameData: GameData) => {
  const client = new DynamoDBClient({endpoint: 'http://localhost:8000'});
  const documentClient = DynamoDBDocument.from(client)
  const putCommand = new PutCommand(
    { 
      TableName: 'Games',
      Item: {
        ...gameData
      }
    }
  )

  return documentClient.send(putCommand)
}

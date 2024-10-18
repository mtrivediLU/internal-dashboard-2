const { MongoClient } = require('mongodb');

async function updateTimestamp() {
  const uri = "mongodb+srv://mihir:loopx@cluster0.ns1yy.mongodb.net/loopx-vehicle-log-test?retryWrites=true&w=majority";  // MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('loopx-vehicle-log-test'); // Your database name
    const collection = database.collection('device_cycle_transformed'); // Your collection name

    // Update only documents where Timestamp is a string and is not 'NA'
    const result = await collection.updateMany(
      { 
        "Timestamp": { 
          "$type": "string",  // Check if Timestamp is a string
          "$ne": "NA"         // Ensure it's not 'NA'
        }
      },
      [
        { 
          $set: { 
            "Timestamp": { 
              $toDate: { 
                $replaceOne: { 
                  input: { $replaceOne: { input: "$Timestamp", find: ",", replacement: "." } }, 
                  find: " ", 
                  replacement: "T" 
                }
              }
            } 
          }
        }
      ]
    );

    console.log(`${result.modifiedCount} documents were updated.`);
  } finally {
    await client.close();
  }
}

updateTimestamp().catch(console.error);

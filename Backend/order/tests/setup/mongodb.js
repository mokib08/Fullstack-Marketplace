const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')


let mongo;

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri()

    process.env.MONGO_URI = uri;
    
    await mongoose.connect(uri, {
        dbName: 'jest'
    });
}, 120000)

beforeEach(async () => {
    // Clear all collections between tests to ensure a clean state
    const collections = await mongoose.connection.db.collections();
    for(const collection of collections){
        await collection.deleteMany({})
    }
});



afterAll(async () => {
    // Close DB connection and stop the in-memory MongoDB server
    await mongoose.connection.close();
    if(mongo){
        await mongo.stop()
    }
}, 30000)
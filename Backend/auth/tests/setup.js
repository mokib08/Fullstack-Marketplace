const {MongoMemoryServer} = require('mongodb-memory-server');
const mongoose = require('mongoose')

let mongoServer;

beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create({
        binary: {
            version: '6.0.12'
        }
    })


    const uri = mongoServer.getUri();
    process.env.JWT_SECRET = 'test_jwt_secret';


    await mongoose.connect(uri, {
        directConnection: true
    });

    console.log('Test database connected')
}, 120000)



afterAll(async () => {
    await mongoose.disconnect();
    if(mongoServer){
        await mongoServer.stop();
    }
})
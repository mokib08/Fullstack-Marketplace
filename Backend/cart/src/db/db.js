const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connect to the database')
    } catch (error) {
        console.log('Error connecting to the database', error)
    }
}


module.exports = connectDB

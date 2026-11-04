require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')


connectDB()

app.listen(3003, () => {
    console.log('order service is runing on port 3003')
})
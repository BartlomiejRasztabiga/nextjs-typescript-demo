
/* This is a database connection function*/
import mongoose from 'mongoose'

type Connection = {
    isConnected: number
}

const connection: Connection = {
    isConnected: 0
} /* creating connection object*/

export default async function database(req, res, next) {
    console.log("database")
    /* check if we have connection to our databse*/
    if (!connection.isConnected) {
        /* connecting to our database */
        console.log(process.env.MONGO_URL)
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    
        connection.isConnected = db.connections[0].readyState
    }
    
    return next()
}
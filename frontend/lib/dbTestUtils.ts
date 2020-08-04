import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

async function connect() {
    const uri = await mongod.getConnectionString()

    return await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

async function close() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close();
    await mongod.stop()
}

async function clear() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

export { connect, close, clear }
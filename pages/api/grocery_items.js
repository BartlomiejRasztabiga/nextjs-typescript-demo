const mongoose = require('mongoose');

let conn = null;

const uri = process.env.MONGO_URL;

export default (req, res) => {
    if (conn == null) {
        conn = mongoose.createConnection(uri, {
            // Buffering means mongoose will queue up operations if it gets
            // disconnected from MongoDB and send them when it reconnects.
            // With serverless, better to fail fast if not connected.
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0 // and MongoDB driver buffering
        });

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn;
        conn.model('Test', new mongoose.Schema({ name: String }));
    }

    const TestModel = conn.model('Test');

    const doc = await TestModel.findOne();
    console.log(doc);

    res.status(200).json({ name: doc.name })
}
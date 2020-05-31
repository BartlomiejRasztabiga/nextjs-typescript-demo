const mongoose = require('mongoose');

const uri = process.env.MONGO_URL

const options = {
    useNewUrlParser: true, // avoids DeprecationWarning: current URL string parser is deprecated
    useCreateIndex: true, // avoids DeprecationWarning: collection.ensureIndex is deprecated.
    useFindAndModify: false, // avoids DeprecationWarning: collection.findAndModify is deprecated.
    useUnifiedTopology: true, // avoids DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
};

mongoose.connect(uri, options);
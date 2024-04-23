const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../helpers/logger');
const AppError = require('../utils/appError');

const uri = process.env.DB_ATLAS;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        logger.info('Connected database');
    } catch (error) {
        new AppError('Database Error - Talk to Admin', 404);
    } finally {
        await client.close();
    }
}

module.exports = {
    connectToDatabase
};
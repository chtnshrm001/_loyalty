import connection from '../utils/dbConnection.js';

import mongoose from 'mongoose';

//OTP Schema
const blacklistedTokenSchema = {
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1d' }
};

const collection = {collection: process.env.SVOC_COLLECTION_BLTOKEN};

async function BLToken() {
    const dbInstance = await connection(process.env.DB_SVOC);
    const model = process.env.SVOC_COLLECTION_BLTOKEN;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }
    
    return dbInstance.model(model, new mongoose.Schema(blacklistedTokenSchema, collection));
}

export default BLToken;
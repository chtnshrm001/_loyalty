import connection from '../utils/dbConnection.js';

import mongoose from 'mongoose';

//OTP Schema
const otpSchema = {
    phone: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 },
    expiresAt: { type: Date, default: Date.now}
};

const collection = {collection: process.env.SVOC_COLLECTION_OTP};

async function OTP() {
    const dbInstance = await connection(process.env.DB_SVOC);
    const model = process.env.SVOC_MODEL_OTP;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }
    
    return dbInstance.model(model, new mongoose.Schema(otpSchema, collection));
}

export default OTP;
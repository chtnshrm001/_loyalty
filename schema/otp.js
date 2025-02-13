import connection from '../utils/dbConnection.js';

import Constants from '../utils/Constants.js';
import mongoose from 'mongoose';

//OTP Schema
const otpSchema = {
    phone: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 },
    expiresAt: { type: Date, default: Date.now}
};

const collection = {collection: Constants.svocCollectionOTP};

async function OTP() {
    const dbInstance = await connection(Constants.dbSVOC);
    const model = Constants.svocModelOTP;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }
    
    return dbInstance.model(model, new mongoose.Schema(otpSchema, collection));
}

export default OTP;
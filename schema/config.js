import connection from '../utils/dbConnection.js'
import mongoose from 'mongoose';

import Constants from '../utils/Constants.js';

const loyaltyMobileConfig = {
    phone: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        default: 'Bronze',
        required: false,
    },
    cashback: {
        type: Number,
        default: 0,
        required: false,
    },
    points: {
        type: Number,
        default: 0,
        required: false,
    }
};
  
const collection = {collection: Constants.loyaltyCollectionMobileConfig};

async function Config() {
    const dbInstance = await connection(Constants.dbLoyaltyEngine);
    const model = Constants.loyaltyModelMobileConfig;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }

    return dbInstance.model(model, new mongoose.Schema(loyaltyMobileConfig, collection));
}
    
export default Config;
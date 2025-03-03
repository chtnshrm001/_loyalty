import connection from '../utils/dbConnection.js'
import mongoose from 'mongoose';

const loyaltyProfileSchema = {
    loyaltyid: {
        type: String
    },
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
    cashbackBalance: {
        type: Number,
        default: 0,
        required: false,
    },
    points: {
        type: Number,
        default: 0,
        required: false,
    },
    cashbackEarned: {
        type: Number,
        default: 0,
        required: false,
    },
    cashbackRedeemed: {
        type: Number,
        default: 0,
        required: false,
    },
    cashbackExpired: {
        type: Number,
        default: 0,
        required: false,
    },
    transactions: {
        type: Array,
        required: false,
    }
};
  
const collection = {collection: process.env.LOYALTY_COLLECTION_PROFILE};

async function Customer() {
    const dbInstance = await connection(process.env.DB_LOYALTY_ENGINE);
    const model = process.env.LOYALTY_MODEL_PROFILE;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }

    return dbInstance.model(model, new mongoose.Schema(loyaltyProfileSchema, collection));
}
    
export default Customer;
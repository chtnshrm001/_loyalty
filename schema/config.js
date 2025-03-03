import connection from '../utils/dbConnection.js'
import mongoose from 'mongoose';

const loyaltyMobileConfig = {
};
  
const collection = {collection: process.env.LOYALTY_COLLECTION_MOBILE_CONFIG};

async function Config() {
    const dbInstance = await connection(process.env.DB_LOYALTY_ENGINE);
    const model = process.env.LOYALTY_MODEL_MOBILE_CONFIG;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }

    return dbInstance.model(model, new mongoose.Schema(loyaltyMobileConfig, collection));
}
    
export default Config;
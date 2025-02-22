import connection from '../utils/dbConnection.js'
import mongoose from 'mongoose';

const brandsSchema = {
    brandName: {
        type: Map,
        of: Number
    }
};
  
const collection = {collection: process.env.LOYALTY_COLLECTION_BRANDS};

async function Customer() {
    const dbInstance = await connection(process.env.DB_LOYALTY_ENGINE);
    const model = process.env.LOYALTY_MODEL_BRANDS;

    //avoid overwriting compiled model
    if (dbInstance.models[model]) {
        return dbInstance.models[model];
    }

    return dbInstance.model(model, new mongoose.Schema(brandsSchema, collection));
}
    
export default Customer;
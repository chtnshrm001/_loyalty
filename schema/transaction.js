import connection from '../utils/dbConnection.js';
import mongoose from 'mongoose';

// Transction Schema
const transactionSchema = {
  customerId: { type: String, ref: 'loyaltyProfile' },
  brandName: String,
  amount: Number,
  points: Number,
  type: String,
  location: String,
  date: { type: Date, default: Date.now },
};

const collection = {collection: process.env.LOYALTY_COLLECTION_TRANSACTION};

async function Transaction() {
  const dbInstance = await connection(process.env.DB_LOYALTY_ENGINE);
  const model = process.env.LOYALTY_MODEL_TRANSACTION;

  //avoid overwriting compiled model
  if (dbInstance.models[model]) {
    return dbInstance.models[model];
  }

  return dbInstance.model(model, new mongoose.Schema(transactionSchema, collection));
}

export default Transaction;
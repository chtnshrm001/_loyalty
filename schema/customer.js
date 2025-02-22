import connection from '../utils/dbConnection.js';
import mongoose from 'mongoose';

// Customer Schema
const customerSchema = {
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'] // Regex to validate email format
  },
  name: {
    type: String,
    required: false,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  preferences: {
    type: Object,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
    trim: true,
  },
  gender: {
    type: String,
    required: false,
    trim: true,
  },
  countryOfResidence: {
    type: String,
    required: false,
    trim: true,
  },
  nationality: {
    type: String,
    required: false,
    trim: true,
  },
  token: {
    type: String,
    required: false,
    trim: true,
  },
  tokenExpiry: {
    type: Date,
    required: false,
    trim: true,
  },
  refToken: {
    type: String,
    required: false,
    trim: true,
  },
  refTokenExpiry: {
    type: Date,
    required: false,
    trim: true,
  },
};

const collection = {collection: process.env.SVOC_COLLECTION_PROFILE};

async function Customer() {
  const dbInstance = await connection(process.env.DB_SVOC);
  const model = process.env.SVOC_MODEL_PROFILE;

  //avoid overwriting compiled model
  if (dbInstance.models[model]) {
    return dbInstance.models[model];
  }

  return dbInstance.model(model, new mongoose.Schema(customerSchema, collection));
}

export default Customer;
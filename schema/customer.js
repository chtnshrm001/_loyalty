import connection from '../utils/dbConnection.js';
import mongoose from 'mongoose';

import Constants from '../utils/Constants.js';

// Customer Schema
const customerSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address'] // Regex to validate email format
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 8,
    match: [Constants.passwordPattern, 'Password must be at least 8 characters long, contain one lowercase letter, one uppercase letter, one digit, one special character']
  },
  name: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  countryOfResidence: {
    type: String,
    required: true,
    trim: true,
  },
  nationality: {
    type: String,
    required: true,
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

const collection = {collection: Constants.svocCollectionProfile};

async function Customer() {
  const dbInstance = await connection(Constants.dbSVOC);
  const model = Constants.svocModelProfile;

  //avoid overwriting compiled model
  if (dbInstance.models[model]) {
    return dbInstance.models[model];
  }

  return dbInstance.model(model, new mongoose.Schema(customerSchema, collection));
}

export default Customer;
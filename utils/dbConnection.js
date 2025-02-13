import mongoose from 'mongoose';
import Constants from '../utils/Constants.js';

let globalConnection = null;
const connectionInstances = {};

const connection = async function(dbStringName){

    if (!globalConnection) {
        globalConnection = await mongoose.connect(Constants.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    if (!connectionInstances[dbStringName]) {
        connectionInstances[dbStringName] = globalConnection.connection.useDb(dbStringName);
        console.log('Using Database: '+ dbStringName);
    } 

    return connectionInstances[dbStringName];
}

export default connection;
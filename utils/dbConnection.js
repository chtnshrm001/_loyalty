import mongoose from 'mongoose';

let globalConnection = null;
const connectionInstances = {};

const connection = async function(dbStringName){

    if (!globalConnection) {
        globalConnection = await mongoose.connect(process.env.DB_URI, {
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
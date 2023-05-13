import { MongoClient } from "mongodb";


if (process.env.DB_URL !== undefined && typeof process.env.DB_URL === 'string') {
    var client = new MongoClient(process.env.DB_URL);
} else {
    console.log('DB_URL is not defined')
    var client = new MongoClient('null');

}

export default client;


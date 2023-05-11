import { MongoClient } from "mongodb";

let client = null

if (process.env.DB !== undefined && typeof process.env.DB === 'string') {
    client = new MongoClient(process.env.DB);
} else {
    console.log('DB_URL is not defined')

}

export default client;


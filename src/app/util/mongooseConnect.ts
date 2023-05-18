import mongoose from 'mongoose';
const connectMongoose = async () => {

    if (process.env.DB_URL !== undefined && typeof process.env.DB_URL === 'string') {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DB_URL)
        console.log('connection solid')
        console.log(mongoose.models)
    }
}

export default connectMongoose;

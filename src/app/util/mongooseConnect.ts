import mongoose from 'mongoose';
const connectMongoose = async () => {
    
    if (process.env.DB_URL !== undefined && typeof process.env.DB_URL === 'string') {
        await mongoose.connect(process.env.DB_URL)
        console.log('connection solid')
        console.log(mongoose.models)
    }

    // const con = async () => {
    //     if (process.env.DB_URL !== undefined && typeof process.env.DB_URL === 'string') {
    //         mongoose.connect(process.env.DB_URL)
    //         console.log('connection solid')
    //         console.log(mongoose.ConnectionStates)
    //     }
    // };
}

export default connectMongoose;

// mongoose.set('strictQuery', false);
// if (process.env.DB_URL !== undefined && typeof process.env.DB_URL === 'string') {
//     mongoose.connect(process.env.DB_URL);
// } else {
//     console.log('DB_URL is not defined')
// }
import mongoose from 'mongoose';


export const connectBD = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MONGODB CONNECTED SUCCESSFULLY!');
        return conn;
    } catch (error) {
        console.error('Error connecting to MONGODB', error);
        process.exit(1);
    }
}
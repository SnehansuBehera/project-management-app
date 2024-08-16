import mongoose from 'mongoose';

const dbConnect = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected : ${conn.connection.host}`.cyan.underline.bold);
}

export default dbConnect;
import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose;

if (!cached.promise) {
  cached.promise = mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'scambuzzer'
  }).then((mongoose) => mongoose);
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'scambuzzer'
      }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

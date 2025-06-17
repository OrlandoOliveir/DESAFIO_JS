import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tasksdb',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Conectado ao MongoDB!');
    return mongoose.connection;
  } catch (error) {
    console.error('Erro na conexão com MongoDB:', error.message);
    throw error; 
  }
};

export default connectDB;
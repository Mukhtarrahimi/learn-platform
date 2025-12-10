require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const morgan = require('morgan');

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('dev'));
}
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server connected on port ${PORT}`);
    });
  } catch (err) {
    console.error('error starting server:', err);
  }
};

startServer();

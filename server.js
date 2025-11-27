const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');
const morgan = require('morgan');

if (process.env.ENVIRONMENT === 'development') {
  app.use(morgan('dev'));
}

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

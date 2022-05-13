const mongoose = require('mongoose');


// connect to mongo db
const mongoUri = 'mongodb://root:password@localhost:27017';
mongoose.connect(mongoUri, { keepAlive: 1 });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});



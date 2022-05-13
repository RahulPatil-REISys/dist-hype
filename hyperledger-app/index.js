const express = require('express');
require('./mongoose');

const app = express();
app.use(express.json()) 
const port = process.env.PORT || 3000;


const routes = require('./routes');
routes(app);
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});
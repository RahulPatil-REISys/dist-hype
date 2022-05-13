const mongoose = require('mongoose');

const MONGO_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD || 'password'; 
// const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_HOSTNAME = process.env.MONGO_HOST || '127.0.0.1';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_DB || 'distributedfilesystem';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// console.log(process.env);
console.log(url);
mongoose.connect(url, {useNewUrlParser: true});

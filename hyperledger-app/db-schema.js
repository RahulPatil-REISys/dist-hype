const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PublicKey = new Schema({
  id: ObjectId,
  p_key: String,
  name: String,
  createdDate: Date,
  modifiedDate: Date,
});

module.exports = mongoose.model('User', PublicKey);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const document = new Schema({
  id: ObjectId,
  title: String,
  description: String,
  organizationType: String,
  files: [{
    type:{type: String},
    path:{type: String},
    name:{type: String},
    fileHex:{type: String},
    txId:{type: String}
  }],
  modifiedDate: Date,
});

module.exports = mongoose.model('Document', document);

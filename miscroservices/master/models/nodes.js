const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Node = new Schema ({
    name: { type: String, required: true },
    conf: { type: Object },
    freeMem: { type: Number },
    totalMem: { type: Number },
    files: { type: Number },
    port: { type: Number }
});

module.exports = mongoose.model('Node', Node)

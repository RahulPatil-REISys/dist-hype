const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new Schema ({
    fileName: { type: String, required: true },
    fileHex: { type: Object },
    nodeName: { type: String },
    nodePort: { type: String },
    userPublicKey: { type: String },
    uploadedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('File', File)

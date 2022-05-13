const path = require('path');
const File = require('../models/files');
const cassandraDB = require('../cassandra-db');

exports.get = function (req, res) {
    console.log(req.params.id);
    // File.findOne({fileHex:req.params.id}).exec(function (err, user) {
    //     if (err)
    //         res.status(500).send(err);
    //     else
    //         res.status(200).send(user);
    // });

    let query = 'SELECT * FROM files where filehex=? ALLOW FILTERING'
    let q1 = cassandraDB.execute(query, [''+req.params.id],{ prepare: true })
    .then(result => {
        console.log(" ========== result")
        console.log(result)
        res.status(200).send(result.rows[0]);
    }).catch((err) => {
        console.log('ERROR In data retrive: ' + err);
        res.status(500).send(err);
    });

};
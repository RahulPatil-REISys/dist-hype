const path = require('path');
const Node = require('../models/nodes');
const client = require('../cassandra-db');
const { randomUUID } = require('crypto');
var count = 1;




exports.create1 = function (req, res) {
    var newNode = new Node(req.body);
    console.log(req.body);
    newNode.save(function (err) {
    // newNode.updateOne({ upsert : true },function (err) {
        console.log(err);
        if(err) {
            res.status(400).send('Unable to save shark to database');
        } else {
            res.status(200).send('Node Saved.');
        }
  });
};

exports.list2 = function (req, res) {
    Node.find({}).exec(function (err, nodes) {
        if (err) {
            return res.send(500, err);
        }
        res.status(200).send({
                nodes: nodes
        });
    });
};

exports.create = function (req, res) {
    // var newNode = new Node(req.body);
    let c = count + 1;
    console.log(req.body)
    console.log(c)
    // console.log(`INSERT INTO nodes(${c}, ${req.body.name}, ${req.body.freeMem}, ${req.body.totalMem}, ${req.body.files}, ${req.body.port})`)
    let query = `INSERT INTO nodes (name,freeMem,totalMem,files,port) VALUES (?, ?, ?, ?, ?)`;
    let q = client.execute(query,[req.body.name,''+req.body.freeMem,''+req.body.totalMem,''+req.body.files,''+req.body.port]).then(result => {
        console.log('Node inserted into nodes table ' );
    }).catch((err) => {console.log('ERROR :', err);});

};

exports.list = function (req, res) {
    Node.find({}).exec(function (err, nodes) {
        if (err) {
            return res.send(500, err);
        }
        res.status(200).send({
                nodes: nodes
        });
    });

    

};


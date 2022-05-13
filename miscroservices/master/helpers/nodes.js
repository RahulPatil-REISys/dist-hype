const Node = require('../models/nodes');
const Files = require('../models/files');
const cassandraDB = require('../cassandra-db');

exports.list1 = function () {
    return new Promise((resolve, reject) => {
        Node.find({}).exec(function (err, nodes) {
            if (err)
                reject(err);
            else
                resolve(nodes);
        });
    });
    
};
exports.list = function () {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM nodes'
        let q1 = cassandraDB.execute(query,{ prepare: true })
        .then(result => {
            resolve(result);
        }).catch((err) => {
            console.log('ERROR In data retrive: ' + err);
            reject(err);
        });
    });
    
};



exports.saveFileData = function(data){
    return new Promise((resolve, reject) => {
        var saveFile = new Files(data);
        console.log(data);
        saveFile.save(function (err) {
            if (err)
                reject(err);
            else
                resolve({msg:'File data saved.'});
        });
    });
}

exports.findFileByName1 = async function(name){
    return new Promise((resolve, reject) => {
        console.log('name:',name);
        Files.findOne({fileName:name}).exec(function (err, file) {
            if (err)
                reject(err);
            else
                resolve(file);
        });
    });
}

exports.findFileByName = async function(name){
    return new Promise((resolve, reject) => {
        console.log('name:',name);
        let query = 'SELECT * FROM files where filename=?'
        let q1 = cassandraDB.execute(query, [''+name],{ prepare: true })
        .then(result => {
            console.log(" ========== result")
            console.log(result)
            resolve(result);
        }).catch((err) => {
            console.log('ERROR In data retrive: ' + err);
            reject(err);
        });
        
        // Files.findOne({fileName:name}).exec(function (err, file) {
        //     if (err)
        //         reject(err);
        //     else
        //         resolve(file);
        // });
    });
}